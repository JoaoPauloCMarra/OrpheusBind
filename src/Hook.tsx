import { useState, useEffect, useCallback } from 'react';
import { createGlobalState, StateUpdater, GlobalStateOptions } from './Core';

export function createUseGlobalState<T>(
  options: GlobalStateOptions<T>,
): () => [T, (stateUpdater: StateUpdater<T>) => void, () => void] {
  const globalState = createGlobalState(options);

  return function useGlobalState(): [T, (stateUpdater: StateUpdater<T>) => void, () => void] {
    const [state, setState] = useState(globalState.getState());

    useEffect(() => {
      const subscription = globalState.subscribe(setState);
      return () => subscription.unsubscribe();
    }, []);

    const setGlobalState = useCallback((stateUpdater: StateUpdater<T>) => {
      globalState.setState(stateUpdater);
    }, []);

    const resetGlobalState = useCallback(() => {
      globalState.resetState();
    }, []);

    return [state, setGlobalState, resetGlobalState];
  };
}
