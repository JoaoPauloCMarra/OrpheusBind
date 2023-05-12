import { createGlobalState } from '../OrpheusBind';

export type CounterGlobalState = number;

const initialState: CounterGlobalState = 0;

export const useCounterGlobalState = createGlobalState<CounterGlobalState>(initialState);
