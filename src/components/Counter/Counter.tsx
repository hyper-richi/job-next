'use client';

import { counterActions } from '@/app/lib/store/features/counter/counterSlice';
import { useAppSelector, useAppDispatch } from '../../app/lib/store/hooks';

export const Counter = () => {
  const dispatch = useAppDispatch();
  const counterValue = useAppSelector((state) => state.counter.value);

  const increment = () => {
    dispatch(counterActions.increment());
  };

  const decrement = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <div>
      <h1 data-testid='value-title'>{counterValue}</h1>
      <button onClick={increment} data-testid='increment-btn'>
        increment
      </button>
      <button data-testid='decrement-btn' onClick={decrement}>
        decrement
      </button>
    </div>
  );
};
