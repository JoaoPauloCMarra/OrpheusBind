import { act, cleanup, renderHook } from '@testing-library/react';
import { createUseGlobalState } from './';
import type { Middleware } from './';

console.log = jest.fn();
const onError = jest.fn();
const errorMsg = 'Sample error from middleware';
const initialState = 0;

const sampleMiddleware: Middleware<number> = (_, newStateOrUpdater) => {
  console.log(newStateOrUpdater);
  return newStateOrUpdater;
};

const errorMiddleware: Middleware<number> = () => {
  throw new Error(errorMsg);
};

const useTestGlobalState = createUseGlobalState<number>({ initialState });
const useTestGlobalStateWithMiddleware = createUseGlobalState<number>({ initialState, middleware: sampleMiddleware });
const useTestGlobalStateWithMiddlewareAndErrorHandling = createUseGlobalState<number>({
  initialState,
  middleware: errorMiddleware,
  onError,
});

describe('OrpheusBind', () => {
  afterEach(cleanup);

  it('should return the initial state', () => {
    const { result } = renderHook(() => useTestGlobalState());
    const [state] = result.current;

    expect(state).toEqual(initialState);
  });

  it('should not change the state when reset action is dispatched but the state is already at its initial value', () => {
    const { result } = renderHook(() => useTestGlobalState());
    const [_, __, resetState] = result.current;

    act(() => {
      resetState();
    });

    const [state] = result.current;
    expect(state).toEqual(initialState);
  });

  it('should update the state with a new value', () => {
    const { result } = renderHook(() => useTestGlobalState());
    const [_, setState] = result.current;

    const nextValue = 2;
    act(() => {
      setState(nextValue);
    });

    const [state] = result.current;
    expect(state).toEqual(nextValue);
  });

  it('should work with middleware', () => {
    const { result } = renderHook(() => useTestGlobalStateWithMiddleware());
    const [_, setState] = result.current;

    const nextValue = 5;
    act(() => {
      setState(nextValue);
    });

    const [state] = result.current;
    expect(state).toEqual(nextValue);
    expect(console.log).toHaveBeenCalledWith(nextValue);
  });

  it('should reset the state to the initial value', async () => {
    const { result } = renderHook(() => useTestGlobalState());
    const [_, setState, resetState] = result.current;

    const nextValue = 2;
    act(() => {
      setState(nextValue);
    });

    let [state] = result.current;
    expect(state).toEqual(2);

    act(() => {
      resetState();
    });

    [state] = result.current;
    expect(state).toEqual(initialState);
  });

  it('should call onError when an error occurs', () => {
    const { result } = renderHook(() => useTestGlobalStateWithMiddlewareAndErrorHandling());
    const [_, setState] = result.current;

    act(() => {
      setState(5);
    });

    expect(onError).toBeCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(new Error(errorMsg));
  });

  it('should not crash the component when an error occurs', () => {
    const { result } = renderHook(() => useTestGlobalStateWithMiddlewareAndErrorHandling());
    const [_, setState] = result.current;

    act(() => {
      setState(5);
    });

    const [state] = result.current;
    expect(state).toEqual(initialState);
  });
});
