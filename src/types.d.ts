declare type StateOrUpdater<T> = T | ((prevState: T) => T);

declare type GlobalState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};
