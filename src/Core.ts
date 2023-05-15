import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export type StateUpdater<T> = T | ((prevState: T) => T);
export type Middleware<T> = (currentState: T, newState: T) => T;
export type GlobalStoreOptions<T> = {
  initialState: T;
  middleware?: Middleware<T>;
  onError?: (err: Error) => void;
};

export function createStore<T>({ initialState, middleware, onError }: GlobalStoreOptions<T>) {
  const state$ = new BehaviorSubject<T>(initialState);

  function getState(): T {
    return state$.getValue();
  }

  function subscribe(listener: (value: T) => void) {
    return state$.pipe(distinctUntilChanged()).subscribe({
      next: listener,
      error: (err) => {
        if (onError) {
          onError(err);
          return;
        }
        console.error('An error occurred:', err);
      },
    });
  }

  function setState(stateUpdater: StateUpdater<T>) {
    try {
      const currentState = state$.getValue();
      const newState =
        typeof stateUpdater === 'function' ? (stateUpdater as (prevState: T) => T)(currentState) : stateUpdater;
      const processedState = middleware ? middleware(currentState, newState) : newState;
      state$.next(processedState as T);
    } catch (err) {
      if (onError) {
        onError(err as Error);
        return;
      }
      console.error('An error occurred while setting the state:', err);
    }
  }

  function resetState() {
    state$.next(initialState);
  }

  return { getState, subscribe, setState, resetState };
}
