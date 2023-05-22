import { useState, useEffect, useMemo, useCallback } from 'react';
import { createStore, GlobalStoreOptions, StateUpdater } from './Core';

export function createUseGlobalState<T>(
  options: GlobalStoreOptions<T>,
): () => [T, (stateUpdater: StateUpdater<T>) => void, () => void] {
  const globalStore = createStore(options);

  return (): [T, (stateUpdater: StateUpdater<T>) => void, () => void] => {
    const [state, setState] = useState(globalStore.getState());

    useEffect(() => {
      const subscription = globalStore.subscribe(setState);
      return () => subscription.unsubscribe();
    }, []);

    const memoizedState = useMemo(() => state, [state]);

    const memoizedSetState = useCallback((stateUpdater: StateUpdater<T>) => {
      globalStore.setState(stateUpdater);
    }, []);

    const memoizedResetState = useCallback(() => {
      globalStore.resetState();
    }, []);

    return [memoizedState, memoizedSetState, memoizedResetState];
  };
}
