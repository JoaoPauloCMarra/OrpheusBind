/* eslint-disable @typescript-eslint/no-explicit-any */
import { Middleware } from '../OrpheusBind';

export const loggingMiddleware: Middleware<any> = (currentState, newStateOrUpdater) => {
  console.log('Previous state:', currentState);

  if (typeof newStateOrUpdater === 'function') {
    const updater = newStateOrUpdater as (state: any) => any;
    return (state: any) => {
      const newState = updater(state);
      console.log('Next state:', newState);
      return newState;
    };
  } else {
    console.log('Next state:', newStateOrUpdater);
    return newStateOrUpdater;
  }
};
