import { useState, useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export type StateOrUpdater<T> = T | ((prevState: T) => T);

export type Middleware<T> = (currentState: T, newStateOrUpdater: StateOrUpdater<T>) => StateOrUpdater<T>;

/**
 * Factory function to create global state hooks
 * @param initialState - The initial state of the global state
 * @param middleware - Optional middleware function for intercepting and modifying actions or updates
 */
export function createGlobalState<T>(initialState: T, middleware?: Middleware<T>) {
  const state$ = new BehaviorSubject<T>(initialState);

  /**
   * Custom hook to use the global state
   * @returns A tuple containing the current state and a function to update the state
   */
  function useGlobalState(): [T, (newStateOrUpdater: StateOrUpdater<T>) => void] {
    const [state, setState] = useState<T>(state$.getValue());

    useEffect(() => {
      // Apply distinctUntilChanged to prevent updates when the state value is the same
      const subscription = state$.pipe(distinctUntilChanged()).subscribe(setState);
      return () => subscription.unsubscribe();
    }, []);

    /**
     * Update the global state with a new value or an updater function
     * @param newStateOrUpdater - The new state value or an updater function that receives the current state
     */
    function updateState(newStateOrUpdater: StateOrUpdater<T>) {
      const currentState = state$.getValue();
      const processedState = middleware ? middleware(currentState, newStateOrUpdater) : newStateOrUpdater;

      if (typeof processedState === 'function') {
        state$.next((processedState as (state: T) => T)(currentState));
      } else {
        state$.next(processedState as T);
      }
    }

    return [state, updateState];
  }

  return useGlobalState;
}
