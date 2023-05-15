import React, { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Root: FC = () => {
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
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
