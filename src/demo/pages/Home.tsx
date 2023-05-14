import React, { FC, Suspense, lazy } from 'react';
import useCounterStore, { initialState } from '../useCounterStore';

const Counter = lazy(() =>
  import('../components/Counter').then((module) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolve(module as any);
      }, 1500);
    });
  }),
);
const Pokemon = lazy(() => import('../components/Pokemon'));

const Home: FC = () => {
  const [state, _, resetState] = useCounterStore();

  return (
    <div className="HomePage Page">
      <h1>Orpheus Bind Demo</h1>
      <Suspense fallback={<h4>Loading counter...</h4>}>
        <Counter />
        <div className="CounterReset">
          <button onClick={resetState} disabled={state === initialState}>
            reset
          </button>
        </div>
      </Suspense>
      <Pokemon />
    </div>
  );
};

export default Home;
