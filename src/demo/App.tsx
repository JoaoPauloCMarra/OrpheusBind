import React, { FC } from 'react';
import { useCounterGlobalState } from './useCounterGlobalState';

const App: FC = () => {
  const [count, setCount] = useCounterGlobalState();

  return (
    <main>
      <h1>Orpheus Bind Demo</h1>
      <div>
        <button onClick={() => setCount((count: number) => count + 1)}>count is {count}</button>
      </div>
    </main>
  );
};

export default App;
