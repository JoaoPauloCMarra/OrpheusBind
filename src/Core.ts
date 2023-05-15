import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export type StateUpdater<T> = T | ((prevState: T) => T);
export type Middleware<T> = (currentState: T, newState: T) => T;
export type GlobalStoreOptions<T> = { initialState: T; middleware?: Middleware<T> };

export function createStore<T>({ initialState, middleware }: GlobalStoreOptions<T>) {
  const state$ = new BehaviorSubject<T>(initialState);

  function getState(): T {
    return state$.getValue();
  }

  function subscribe(listener: (value: T) => void) {
    return state$.pipe(distinctUntilChanged()).subscribe(listener);
  }

  function setState(stateUpdater: StateUpdater<T>) {
    const currentState = state$.getValue();
    const newState =
      typeof stateUpdater === 'function' ? (stateUpdater as (prevState: T) => T)(currentState) : stateUpdater;
    const processedState = middleware ? middleware(currentState, newState) : newState;
    state$.next(processedState as T);
  }

  function resetState() {
    state$.next(initialState);
  }

  return { getState, subscribe, setState, resetState };
}
