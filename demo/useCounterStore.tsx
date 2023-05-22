import { Middleware, createUseGlobalState } from '../src';

type CounterState = number;

const middleware: Middleware<CounterState> = (currentState, newState) => {
  console.log('Previous State:', currentState);
  console.log('Next State:', newState);
  return newState;
};

export const initialState = 0;

const useCounterStore = createUseGlobalState<CounterState>({
  prefix: 'counter',
  initialState,
  middleware,
});

export default useCounterStore;
