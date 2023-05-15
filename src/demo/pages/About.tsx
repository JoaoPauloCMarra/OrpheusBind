import React, { FC } from 'react';
import useCounterStore, { initialState } from '../useCounterStore';

const About: FC = () => {
  const [state, _, resetState] = useCounterStore();

  return (
    <div className="AboutPage Page">
      <h1>About</h1>
      <div className="CounterReset">
        <p>current counter value: {state}</p>
        <button onClick={resetState} disabled={state === initialState}>
          reset
        </button>
      </div>
    </div>
  );
};

export default About;
