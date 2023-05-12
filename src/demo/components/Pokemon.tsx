import React, { FC, useCallback, useEffect } from 'react';
import usePokemonStore from '../usePokemonStore';
import './Pokemon.css';

const Pokemon: FC = () => {
  const [state, setState] = usePokemonStore();

  const onOpenPokeball = useCallback(() => {
    setState({
      loading: true,
    });
    fetch(`https://pokeapi.co/api/v2/pokemon-form/${Math.floor(Math.random() * 99)}/`)
      .then(async (response) => {
        if (!response.ok) {
          const message = await response.text();
          console.error(message);
          setState({
            error: message || 'not found...',
          });
          return;
        }
        const data = await response.json();
        if (!data.name || !data?.sprites?.front_default) return;
        setState({
          name: data.name,
          url: data?.sprites?.front_default,
        });
      })
      .catch(() => {
        setState({
          error: 'not found...',
        });
      });
  }, [setState]);

  useEffect(() => {
    onOpenPokeball();
  }, [onOpenPokeball]);

  return (
    <div className="Pokemon">
      <h4>This is your new pokemon :)</h4>
      <div className="Pokemon--info">
        {state.loading && <small>opening pokeball...</small>}
        {!state.loading && state.error && <small>{state.error}</small>}
        {!state.loading && state.url && state.name && (
          <>
            <div className="Pokemon--photo">
              <img src={state.url} alt={state.name} />
            </div>
            <span className="Pokemon--name">{state.name}</span>
            <button onClick={onOpenPokeball}>try again...</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Pokemon;
