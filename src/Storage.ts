export class GlobalStoreError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'GlobalStoreError';
  }
}

export function persistState<T>(state: T, prefix: string, onError?: (err: GlobalStoreError) => void) {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem(`${prefix}-state`, serializedState);
  } catch (e) {
    onError?.(new GlobalStoreError('Could not save state to sessionStorage'));
  }
}

export function retrievePersistedState<T>(
  initialState: T,
  prefix: string,
  onError?: (err: GlobalStoreError) => void,
): T {
  try {
    const serializedState = sessionStorage.getItem(`${prefix}-state`);
    return serializedState !== null ? JSON.parse(serializedState) : initialState;
  } catch (e) {
    onError?.(new GlobalStoreError('Could not retrieve state from sessionStorage, using initialState instead'));
    return initialState;
  }
}
