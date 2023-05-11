declare type StateOrUpdater<T> = T | ((prevState: T) => T);

declare type GlobalState = {
  [key: string]: any;
};
