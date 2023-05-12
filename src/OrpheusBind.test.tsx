import { act, renderHook } from '@testing-library/react';
import { createGlobalState, Middleware } from './OrpheusBind';

const initialState = 0;
const useTestGlobalState = createGlobalState<number>(initialState);

const sampleMiddleware: Middleware<number> = (_, newStateOrUpdater) => {
  return newStateOrUpdater;
};

const useTestGlobalStateWithMiddleware = createGlobalState<number>(initialState, sampleMiddleware);

describe('OrpheusBind', () => {
  it('should return the initial state', () => {
    const { result } = renderHook(() => useTestGlobalState());
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

  it('should update the state with an updater function', () => {
    const { result } = renderHook(() => useTestGlobalState());
    const [_, setState] = result.current;

    const nextValue = 3;
    act(() => {
      setState((current) => current + 1);
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
  });

  it('should not update the state when the value is the same', () => {
    const { result } = renderHook(() => useTestGlobalState());
    const [_, setState] = result.current;

    act(() => {
      setState(initialState);
    });

    const [state] = result.current;
    expect(state).toEqual(initialState);
  });

  it('should not update the state when the updater function returns the same value', () => {
    const { result } = renderHook(() => useTestGlobalState());
    const [_, setState] = result.current;

    act(() => {
      setState((current) => current);
    });

    const [state] = result.current;
    expect(state).toEqual(initialState);
  });
});
