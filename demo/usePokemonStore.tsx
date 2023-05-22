import { Middleware, createUseGlobalState } from '../src';

type PokemonState = {
  name?: string;
  url?: string;
  error?: string;
  loading?: boolean;
};

const middleware: Middleware<PokemonState> = (_, newState) => {
  console.log('Your new Pokemon:', newState?.name);
  return newState;
};

export const initialState = { loading: true };

const usePokemonStore = createUseGlobalState<PokemonState>({ prefix: 'pokemon', initialState, middleware });

export default usePokemonStore;
