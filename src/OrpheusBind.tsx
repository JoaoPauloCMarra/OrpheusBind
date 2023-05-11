import { useState, useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';

// Factory function to create global state hooks
export function createGlobalState<T extends GlobalState>(initialState: T) {
  const globalState$ = new BehaviorSubject<T>(initialState);

  function updateGlobalState(newStateOrUpdater: StateOrUpdater<T>): void {
    const currentState = globalState$.value;
    const newState = typeof newStateOrUpdater === 'function' ? newStateOrUpdater(currentState) : newStateOrUpdater;
    globalState$.next(newState);
  }

  function useCustomGlobalState(): [T, (newStateOrUpdater: StateOrUpdater<T>) => void] {
    const [state, setState] = useState<T>(globalState$.value);

    useEffect(() => {
      // Subscribe to global state updates
      const subscription = globalState$.subscribe(setState);

      // Unsubscribe when the component unmounts
      return () => {
        subscription.unsubscribe();
      };
    }, []);

    return [state, updateGlobalState];
  }

  return useCustomGlobalState;
}
