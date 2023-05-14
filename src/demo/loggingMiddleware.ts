import { Middleware } from '../types';

type Value = number | string | boolean;

export const loggingMiddleware: Middleware<Value> = (currentState, newStateOrUpdater) => {
  console.log('Previous state:', currentState);

  if (typeof newStateOrUpdater === 'function') {
    const updater = newStateOrUpdater as (state: Value) => Value;
    return (state: Value) => {
      const newState = updater(state);
      console.log('Next state:', newState);
      return newState;
    };
  } else {
    console.log('Next state:', newStateOrUpdater);
    return newStateOrUpdater;
  }
};
