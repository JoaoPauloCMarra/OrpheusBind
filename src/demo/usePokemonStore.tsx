import { createGlobalState } from '../OrpheusBind';
import { loggingMiddleware } from './loggingMiddleware';

export type PokemonState = {
  name?: string;
  url?: string;
  error?: string;
  loading?: boolean;
};

export const initialState = { loading: true };

const usePokemonStore = createGlobalState<PokemonState>(initialState, { middleware: loggingMiddleware });

export default usePokemonStore;
