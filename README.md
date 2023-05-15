# OrpheusBind 🎶

OrpheusBind is a simple, lightweight, and type-safe global state management library for React applications. It leverages the power of React hooks and RxJS to provide an easy-to-use solution for managing your application state.

## 🌟 Features

- Simple and intuitive API, which makes it easy to get started.
- Strongly typed, with full TypeScript support for safer coding and tooling support.
- Based on React hooks and RxJS, integrating the power of reactive programming with modern React.
- No need to install RxJS separately, it's included in the package.
- Lightweight and modular, easy to integrate into existing projects without bloating your bundle.
- Supports code splitting and lazy loading out of the box, which can significantly improve initial load times.
- Middleware support, providing a powerful way to intercept and modify actions or updates before they reach the state.
- State reset functionality, allowing you to easily revert back to the initial state.
- Efficient updates and memoization to minimize unnecessary renders, helping to keep your application performant.
- Error Handling: Built-in support for error handling.

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
const middleware: Middleware<UserGlobalState> = (currentState, newState) => {
  console.log('Updating state:', currentState, newState);
  return newState;
};

export const useUserGlobalState = createGlobalState<UserGlobalState>({ initialState, middleware });
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
