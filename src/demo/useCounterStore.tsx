import { Middleware, createUseGlobalState } from '../';

type CounterState = number;

const middleware: Middleware<CounterState> = (currentState, newState) => {
  console.log('Previous State:', currentState);
  console.log('Next State:', newState);
  return newState;
};

export const initialState = 0;

const useCounterStore = createUseGlobalState<CounterState>({
  initialState,
  middleware,
});

export default useCounterStore;
