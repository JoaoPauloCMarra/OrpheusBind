# OrpheusBind 🎶

OrpheusBind is a simple, lightweight, and type-safe global state management library for React applications. It leverages the power of React hooks and RxJS to provide an easy-to-use solution for managing your application state.

## 🌟 Features

- Simple and intuitive API
- Type-safe with TypeScript support
- Based on React hooks and RxJS
- No need to install RxJS separately
- Lightweight and easy to integrate
- Code splitting and lazy loading support
- Middleware support for intercepting and modifying actions or updates
- State reset functionality to revert back to the initial state
- Efficient updates and memoization to minimize unnecessary renders

## 📦 Installation

Add OrpheusBind to your project with the following command:

```bash
npm install orpheus-bind
```

or

```bash
yarn add orpheus-bind
```

## 💡 Usage

#### 1. Create a custom global state hook

Create a file to define your custom global state hook, including the state interface and initial state:

```tsx
// src/userGlobalState.ts

import { createGlobalState, Middleware } from 'orpheus-bind';

export interface UserGlobalState {
  user: {
    id: number;
    name: string;
  } | null;
}

const initialState: UserGlobalState = {
  user: null,
};

// Optional middleware for logging state updates
const loggingMiddleware: Middleware<UserGlobalState> = (currentState, newStateOrUpdater) => {
  console.log('Updating state:', currentState, newStateOrUpdater);
  return newStateOrUpdater;
};

export const useUserGlobalState = createGlobalState<UserGlobalState>(initialState, loggingMiddleware);
```

#### 2. Use the custom global state hook in your components

Utilize your custom global state hook in any component:

```tsx
// src/SomeComponent.tsx

import React from 'react';
import { useUserGlobalState } from './userGlobalState';

const SomeComponent: React.FC = () => {
  const [state, updateState] = useUserGlobalState();

  const handleLogin = () => {
    updateState({ user: { id: 1, name: 'John Doe' } });
  };

  const handleLogout = () => {
    updateState({ user: null });
  };

  return (
    <div>
      {state.user ? (
        <>
          <div>Welcome, {state.user.name}!</div>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default SomeComponent;
```

### Resetting the Global State

OrpheusBind provides a convenient `resetState` method that allows you to reset the global state back to its initial value. This is useful when you want to clear the current state and start from scratch.

#### Usage:

##### 1. Create a custom global state hook

Create a file to define your custom global state hook, including the state interface and initial state:

```tsx
// src/SomeComponent.tsx

import React from 'react';
import { useUserGlobalState } from './userGlobalState';

const SomeComponent: React.FC = () => {
  const [state, updateState, resetState] = useUserGlobalState();

  const handleLogin = () => {
    updateState({ user: { id: 1, name: 'John Doe' } });
  };

  const handleLogout = () => {
    resetState();
  };

  return (
    <div>
      {state.user ? (
        <>
          <div>Welcome, {state.user.name}!</div>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default SomeComponent;
```

#### also check the [DEMO](src/demo) application to see a simplier implementation example
