import { createUseGlobalState } from '../';
import { loggingMiddleware } from './loggingMiddleware';

export const initialState = 0;

const useCounterStore = createUseGlobalState<number>({ initialState, middleware: loggingMiddleware });

export default useCounterStore;
