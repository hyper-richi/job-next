import { type PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../../../createAppSlice';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { FavoritesSchema } from '../types/favoritesSchema';
import { Vacancy, VacancyDev } from '../../../../../../..';

const initialState: FavoritesSchema = {
  status: 'idle',
  favorites: null,
  error: null,
};

export const favoritesSlice = createAppSlice({
  name: 'favorites',
  initialState,
  reducers: (create) => ({
    logoutUser: create.reducer((state) => {
      state.favorites = null;
    }),
    addFavorites: create.asyncThunk<void, VacancyDev>(
      async (vacancy, thunkApi) => {
        try {
          const res = await axios.post('https://6ede402e6a352dfb.mokky.dev/favoritesVacancies', vacancy);
          console.log('res: ', res);

          /* const res = await axios.post<AuthApiResponse>('https://6ede402e6a352dfb.mokky.dev/register', registrData);
          return res.data; */

        } catch (error) {
          const err = error as AxiosError;
          return thunkApi.rejectWithValue({
            message: 'Ошибка в обработке запроса: ' + err.message,
            additionalMessage: (err.response as AxiosResponse)?.data.message,
            code: err.status || (err.response as AxiosResponse)?.data.statusCode,
          });
        }
      },
      {
        pending: (state) => {
          state.status = 'loading';
          state.error = null;
        },
        rejected: (state, action) => {
          state.status = 'error';
          state.error = action.error;
        },
        fulfilled: (state, action) => {
          state.status = 'idle';
          state.error = null;
          // state.favorites = action.payload.data;
        },
        // settled вызывается как за отклоненные, так и за выполненные действия
        settled: (state) => {
          state.status = 'idle';
        },
      }
    ),

    deleteFavorites: create.asyncThunk<void, string>(
      async (vacancyId, thunkApi) => {
        try {
          /*  const response = await fetchDeleteUser(vacancyId);
          return response; */
        } catch (error) {
          const err = error as AxiosError;
          return thunkApi.rejectWithValue({
            message: 'Ошибка в обработке запроса: ' + err.message,
            additionalMessage: (err.response as AxiosResponse)?.data.message,
            code: err.status || (err.response as AxiosResponse)?.data.statusCode,
          });
        }
      },
      {
        pending: (state) => {
          state.status = 'loading';
        },
        rejected: (state, action) => {
          state.status = 'error';
          state.error = action.error;
        },
        fulfilled: (state) => {
          state.status = 'idle';
          state.favorites = null;
        },
        // settled вызывается как за отклоненные, так и за выполненные действия
        settled: (state) => {
          state.status = 'idle';
        },
      }
    ),
  }),
  selectors: {
    selectFavorites: (state) => state.favorites,
    selectStatusFavorites: (state) => state.status,
  },
});

export const { addFavorites, deleteFavorites } = favoritesSlice.actions;
export const { selectFavorites, selectStatusFavorites } = favoritesSlice.selectors;
