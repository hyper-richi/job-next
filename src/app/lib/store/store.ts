import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { authUserSlice } from './features/auth/slice/authUserSlice';
import { fileSlice } from './features/file/slice/fileSlice';
import { favoritesSlice } from './features/favorites/slice/favorites';
import { rtkApi } from '../api/rtkApi';

const rootReducer = combineSlices(authUserSlice, fileSlice, favoritesSlice, rtkApi);

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
