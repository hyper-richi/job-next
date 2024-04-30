import { combineSlices, configureStore } from '@reduxjs/toolkit';
import {userSlice } from './features/user/slice/userSlice';
import { fileSlice } from './features/file/slice/fileSlice';
import { favoritesSlice } from './features/favorites/slice/favoritesSlice';
import { rtkApi } from '../api/rtkApi';

const rootReducer = combineSlices(userSlice, fileSlice, favoritesSlice, rtkApi);

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
