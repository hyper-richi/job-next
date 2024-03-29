import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { CounterSchema } from './types/counterSchema';


const initialState: CounterSchema = {
  value: 0,
};

// Если не используем асинхронные запросы, использовать автономный `createSlice`.
export const counterSlice = createSlice({
  name: 'counter1',
  // `createSlice` определит тип состояния из аргумента `initialState`.
  initialState,
  // Поле «reducers» позволяет нам определять редукторы и генерировать связанные действия.
  reducers: (create) => ({
    increment: create.reducer((state) => {
      // Redux Toolkit позволяет нам писать «мутирующую» логику в редукторах.
      // На самом деле он не меняет состояние, поскольку использует библиотеку Immer,
      // который обнаруживает изменения в «черновом состоянии» и создает совершенно новый
      // неизменное состояние, основанное на этих изменениях
      state.value += 1;
    }),
    decrement: create.reducer((state) => {
      state.value -= 1;
    }),
    // Используйте тип PayloadAction для объявления содержимого action.payload.
    incrementByAmount: create.reducer((state, action: PayloadAction<number>) => {
      state.value += action.payload;
    }),
  }),
});

export const { actions: counterActions } = counterSlice;
export const { reducer: counterReducer } = counterSlice;
