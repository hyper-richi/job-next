import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { authUserSlice } from './features/auth/slice/authUserSlice';
import { fileSlice } from './features/file/slice/fileSlice';

const rootReducer = combineSlices(authUserSlice, fileSlice);

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
