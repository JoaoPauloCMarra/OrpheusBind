import { createGlobalState } from '../OrpheusBind';
import { loggingMiddleware } from './loggingMiddleware';

export const initialState = 0;

const useCounterStore = createGlobalState<number>(initialState, { middleware: loggingMiddleware });

export default useCounterStore;
