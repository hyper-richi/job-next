import { CounterSchema } from '../../types/counterSchema';

export const selectCounter = (state: CounterSchema) => state.value;
