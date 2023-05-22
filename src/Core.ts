import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { GlobalStoreError, persistState, retrievePersistedState } from './Storage';

export type StateUpdater<T> = T | ((prevState: T) => T);
export type Middleware<T> = (currentState: T, newState: T) => T;
export type GlobalStoreOptions<T> = {
  initialState: T;
  prefix: string;
  middleware?: Middleware<T>;
  onError?: (err: GlobalStoreError) => void;
};

export function createStore<T>({ initialState, middleware, onError, prefix }: GlobalStoreOptions<T>) {
  const persistedState = retrievePersistedState(initialState, prefix, onError);
  const state$ = new BehaviorSubject<T>(persistedState);

  function getState(): T {
    return state$.getValue();
  }

  function subscribe(listener: (value: T) => void) {
    return state$.pipe(distinctUntilChanged()).subscribe({
      next: listener,
      error: (err) => {
        onError?.(new GlobalStoreError(err.message));
      },
    });
  }

  function setState(stateUpdater: StateUpdater<T>) {
    try {
      const currentState = state$.getValue();
      const newState =
        typeof stateUpdater === 'function' ? (stateUpdater as (prevState: T) => T)(currentState) : stateUpdater;
      const processedState = middleware ? middleware(currentState, newState) : newState;

      persistState(processedState, prefix, onError);

      state$.next(processedState as T);
    } catch (err) {
      if (err instanceof Error) {
        onError?.(new GlobalStoreError(err.message));
      }
    }
  }

  function resetState() {
    state$.next(initialState);
  }

  return { getState, subscribe, setState, resetState };
}
