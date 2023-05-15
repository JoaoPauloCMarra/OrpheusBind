import React, { FC, useCallback } from 'react';
import useCounterStore from '../useCounterStore';
import './Counter.css';

const Counter: FC = () => {
  const [count, setCount] = useCounterStore();

  const increment = useCallback(() => {
    setCount((current: number) => current + 1);
  }, [setCount]);

  const decrement = useCallback(() => {
    setCount((current: number) => current - 1);
  }, [setCount]);

  return (
    <div className="Counter">
      <button onClick={decrement}>-</button>
      <span className="Counter--count">{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
};

export default Counter;
