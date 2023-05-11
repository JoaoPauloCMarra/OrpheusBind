# OrpheusBind 🎶

OrpheusBind is a simple, lightweight, and type-safe global state management library for React applications. It leverages the power of React hooks and RxJS to provide an easy-to-use solution for managing your application state.

## 🌟 Features

- Simple and intuitive API
- Type-safe with TypeScript support
- Based on React hooks and RxJS
- No need to install RxJS separately
- Lightweight and easy to integrate

## 📦 Installation

Add OrpheusBind to your project with the following command:

```bash
yarn add orpheus-bind
```

## 💡 Usage

#### 1. Create a custom global state hook

Create a file to define your custom global state hook, including the state interface and initial state:

```tsx
// src/userGlobalState.ts

import { createGlobalState } from "orpheus-bind";

export interface UserGlobalState {
  user: {
    id: number;
    name: string;
  } | null;
}

const initialState: UserGlobalState = {
  user: null,
};

export const useUserGlobalState =
  createGlobalState<UserGlobalState>(initialState);
```

#### 2. Use the custom global state hook in your components

Utilize your custom global state hook in any component:

```tsx
// src/SomeComponent.tsx

import React from "react";
import { useUserGlobalState } from "./userGlobalState";

const SomeComponent: React.FC = () => {
  const [state, updateState] = useUserGlobalState();

  const handleLogin = () => {
    updateState({ user: { id: 1, name: "John Doe" } });
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

# 🚀 Future Features

- Middleware support for intercepting and modifying actions or updates
- DevTools integration for easy debugging and monitoring of state changes
- Code splitting and lazy loading support
- Efficient updates and memoization to minimize unnecessary renders
- Scoped state management for better application structure
- Easier integration with other popular libraries
- Better error handling and recovery
- Comprehensive documentation and examples
