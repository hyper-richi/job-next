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
    clearFavorites: create.reducer((state) => {
      state.favorites = [];
    }),
    getFavorites: create.asyncThunk<VacancyTransform[], string>(
      async (user_id, thunkApi) => {
        console.log('getFavorites: ');
        try {
          const res = await axios.get<VacancyTransform[]>(`https://6ede402e6a352dfb.mokky.dev/favoritesVacancies?user_id=${user_id}`);
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
      async (vacancy_id, thunkApi) => {
        try {
          await axios.delete(`https://6ede402e6a352dfb.mokky.dev/favoritesVacancies/${vacancy_id}`);

          return vacancy_id;
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
          // names.splice(2, 1); // начиная со второго элемента удаляем один элемент
          state.favorites.splice(
            state.favorites.findIndex((favoriteVacancy) => favoriteVacancy.id === action.payload),
            1
          );
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
  },
});

export const { addFavorites, deleteFavorites, getFavorites, clearFavorites } = favoritesSlice.actions;
export const { selectFavorites } = favoritesSlice.selectors;
