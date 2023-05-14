declare type StateUpdater<T> = T | ((prevState: T) => T);

declare type Middleware<T> = (currentState: T, stateUpdater: StateUpdater<T>) => StateUpdater<T>;

declare interface Options<T> {
  middleware?: Middleware<T>;
}
