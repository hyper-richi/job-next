import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { fileSlice } from './features/file/slice/fileSlice';
import { favoritesSlice } from './features/favorites/slice/favoritesSlice';
import { rtkApi } from '../api/rtkApi';
import { authProfileSlice } from './features/authProfile/slice/authProfileSlice';
import { usersSlice } from './features/users/slice/usersSlice';

const rootReducer = combineSlices(authProfileSlice, usersSlice, fileSlice, favoritesSlice, rtkApi);

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
