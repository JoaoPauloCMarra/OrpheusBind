import React, { FC, useCallback } from 'react';
import { createGlobalState } from '../OrpheusBind';
import { loggingMiddleware } from './loggingMiddleware';

const useCounterGlobalState = createGlobalState<number>(0, loggingMiddleware);

const App: FC = () => {
  const [count, setCount] = useCounterGlobalState();

  const increment = useCallback(() => {
    setCount((current: number) => current + 1);
  }, [setCount]);

  const decrement = useCallback(() => {
    setCount((current: number) => current - 1);
  }, [setCount]);

  return (
    <main>
      <h1>Orpheus Bind Demo</h1>
      <div>
        <button onClick={decrement}>-</button>
        <span> {count} </span>
        <button onClick={increment}>+</button>
      </div>
    </main>
  );
};

export default App;
