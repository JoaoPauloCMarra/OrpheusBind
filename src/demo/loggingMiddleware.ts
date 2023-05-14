// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loggingMiddleware: any = (currentState, newStateOrUpdater) => {
  console.log('Previous state:', currentState);

  if (typeof newStateOrUpdater === 'function') {
    const updater = newStateOrUpdater as (state: unknown) => unknown;
    return (state: unknown) => {
      const newState = updater(state);
      console.log('Next state:', newState);
      return newState;
    };
  } else {
    console.log('Next state:', newStateOrUpdater);
    return newStateOrUpdater;
  }
};
