import React, { FC, useCallback, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { createStore } from '../../Core';

const vanillaStore = createStore({ initialState: 'vanilla' });

const Root: FC = () => {
  const onVanillaStateChange = useCallback(() => {
    vanillaStore.setState('vanilla js store updated...');
    console.log(`vanilla store value: ${vanillaStore.getState()}`);
  }, []);

  useEffect(() => {
    console.log(`vanilla store value: ${vanillaStore.getState()}`);
  }, []);

  return (
    <div>
      <nav className="Nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <button onClick={onVanillaStateChange}>change string</button>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
