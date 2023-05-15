import React, { FC } from 'react';
import useCounterStore, { initialState } from '../useCounterStore';
import usePokemonStore from '../usePokemonStore';

const About: FC = () => {
  const [counter, _, resetCounter] = useCounterStore();
  const [pokemon] = usePokemonStore();

  return (
    <div className="AboutPage Page">
      <h1>About</h1>
      <div className="CounterReset">
        <p>current counter value: {counter}</p>
        <button onClick={resetCounter} disabled={counter === initialState}>
          reset
        </button>
      </div>
      <div className="MyPokemon">
        <p>current pokemon:</p>
        <img src={pokemon.url} alt={pokemon.name} />
      </div>
    </div>
  );
};

export default About;
