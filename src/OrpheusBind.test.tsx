import { act, renderHook } from '@testing-library/react';
import { createGlobalState } from './OrpheusBind';

interface TestGlobalState {
  count: number;
}

const initialState: TestGlobalState = {
  count: 0,
};

const useTestGlobalState = createGlobalState<TestGlobalState>(initialState);

describe('OrpheusBind', () => {
  it('should return the initial state', () => {
    const { result } = renderHook(() => useTestGlobalState());
    const [state] = result.current;
    expect(state).toEqual(initialState);
  });

  it('should update the state with a new value', () => {
    const { result } = renderHook(() => useTestGlobalState());
    const [_, setState] = result.current;

    const nextValue = { count: 2 };
    act(() => {
      setState(nextValue);
    });

    const [state] = result.current;
    expect(state).toEqual(nextValue);
  });

  it('should update the state with an updater function', () => {
    const { result } = renderHook(() => useTestGlobalState());
    const [_, setState] = result.current;

    act(() => {
      setState((prevState) => ({
        count: prevState.count + 1,
      }));
    });

    const [state] = result.current;
    expect(state).toEqual({ count: 3 });
  });
});
