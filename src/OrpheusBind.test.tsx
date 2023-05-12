import { act, cleanup, renderHook } from '@testing-library/react';
import { createGlobalState, Middleware } from './OrpheusBind';

console.log = jest.fn();
const initialState = 0;
const sampleMiddleware: Middleware<number> = (value, newStateOrUpdater) => {
  console.log(newStateOrUpdater);
  return newStateOrUpdater;
};

const useTestGlobalState = createGlobalState<number>(initialState);
const useTestGlobalStateWithMiddleware = createGlobalState<number>(initialState, { middleware: sampleMiddleware });

describe('OrpheusBind', () => {
  afterEach(cleanup);

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
});
