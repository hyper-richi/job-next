import { createAppSlice } from '../../../createAppSlice';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { FavoritesSchema } from '../types/favoritesSchema';
import { ResponseError, VacancyTransform } from '../../../../../../..';

const initialState: FavoritesSchema = {
  status: 'idle',
  favorites: [] as VacancyTransform[],
  error: null,
};

export const favoritesSlice = createAppSlice({
  name: 'favorites',
  initialState,
  reducers: (create) => ({
    getFavorites: create.asyncThunk<VacancyTransform[], void>(
      async (_, thunkApi) => {
        try {
          const res = await axios.get<VacancyTransform[]>('https://6ede402e6a352dfb.mokky.dev/favoritesVacancies');
          if (!res.data) {
            throw new Error('Ошибка в обработке запроса, повторите попытку позже!');
          }
          return res.data;
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
          state.favorites = action.payload;
          // state.favorites = action.payload.data;
        },
        // settled вызывается как за отклоненные, так и за выполненные действия
        settled: (state) => {
          state.status = 'idle';
        },
      }
    ),
    addFavorites: create.asyncThunk<VacancyTransform, VacancyTransform>(
      async (vacancy, thunkApi) => {
        // const state = thunkApi.getState() as AppState;

        try {
          const res = await axios.post<VacancyTransform>('https://6ede402e6a352dfb.mokky.dev/favoritesVacancies', vacancy);
          if (!res.data) {
            throw new Error('Ошибка в обработке запроса, повторите попытку позже!');
          }
          return res.data;
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
          state.favorites.push(action.payload);
          // state.favorites = action.payload.data;
        },
        // settled вызывается как за отклоненные, так и за выполненные действия
        settled: (state) => {
          state.status = 'idle';
        },
      }
    ),

    deleteFavorites: create.asyncThunk<AxiosError | string, string>(
      async (vacancyId, thunkApi) => {
        try {
          await axios.delete(`https://6ede402e6a352dfb.mokky.dev/favoritesVacancies/${vacancyId}`);

          return vacancyId;
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
          state.error = action.payload as ResponseError;
        },
        fulfilled: (state, action) => {
          state.status = 'idle';
         // state.favorites = [...state.favorites.filter((item) => item.id !== action.payload)];
         // names.splice(2, 1); // начиная со второго элемента удаляем один элемент
         state.favorites.splice(state.favorites.findIndex((favoriteVacancy) => favoriteVacancy.id === action.payload), 1);
        },
        // settled вызывается как за отклоненные, так и за выполненные действия
        settled: (state) => {
          state.status = 'idle';
        },
      }
    ),
  }),
  /* selectors: {
    selectFavorites: (state) => state.favorites.filter((item) => item.userId === state.authUser?.id),
    selectStatusFavorites: (state) => state.status,
  }, */
});

export const { addFavorites, deleteFavorites, getFavorites } = favoritesSlice.actions;
// export const { selectFavorites, selectStatusFavorites } = favoritesSlice.selectors;
