import { useState, useEffect, useMemo, useCallback } from 'react';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

/**
 * Factory function to create global state hooks
 * @param initialState - The initial state of the global state
 * @param options - Optional configuration object
 */
export function createGlobalState<T>(initialState: T, options: Options<T> = {}) {
  const { middleware } = options;

  const state$ = new BehaviorSubject<T>(initialState);

  /**
   * Custom hook to use the global state
   * @returns A tuple containing the current state, a function to update the state, and a function to reset the state
   */
  function useGlobalState(): [T, (stateUpdater: StateUpdater<T>) => void, () => void] {
    const [state, setState] = useState<T>(state$.getValue());

    useEffect(() => {
      const subscription = state$.pipe(distinctUntilChanged()).subscribe(setState);
      return () => subscription.unsubscribe();
    }, []);

    /**
     * Update the global state with a new value or an updater function
     * @param stateUpdater - The new state value or an updater function that receives the current state
     */
    const updateState = useCallback((stateUpdater: StateUpdater<T>) => {
      const currentState = state$.getValue();
      const processedState = middleware ? middleware(currentState, stateUpdater) : stateUpdater;

      if (typeof processedState === 'function') {
        state$.next((processedState as (state: T) => T)(currentState));
      } else {
        state$.next(processedState as T);
      }
    }, []);

    /**
     * Reset the global state to the initial value
     */
    const resetState = useCallback(() => {
      state$.next(initialState);
    }, []);

    const memoizedState = useMemo(() => state, [state]);

    return [memoizedState, updateState, resetState];
  }

  return useGlobalState;
}
