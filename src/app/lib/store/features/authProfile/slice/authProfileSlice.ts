import { type PayloadAction } from '@reduxjs/toolkit';
import { AuthApiResponse, authProfileSchema, RegisterUserData, User, DataUserUpdate } from '../types/authProfileSchema';
import { createAppSlice } from '../../../createAppSlice';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ResponseError } from '../../../../../../..';

const initialState: authProfileSchema = {
  status: 'none',
  token: null,
  user: null,
  error: null,
};

export const authProfileSlice = createAppSlice({
  name: 'user',
  initialState,
  reducers: (create) => ({
    setauthProfile: create.reducer((state, action: PayloadAction<User>) => {
      if (!state.user) {
        state.user = action.payload;
      }
      // state.token = action.payload.token;
    }),
    registerUser: create.asyncThunk<AuthApiResponse, RegisterUserData>(
      async (registerData, thunkApi) => {
        // const { dispatch, getState, fulfillWithValue } = thunkApi;
        try {
          const res = await axios.post<AuthApiResponse>('https://6ede402e6a352dfb.mokky.dev' + '/register', registerData);
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
          state.status = 'none';
          state.error = null;
          state.user = action.payload.data;
        },
        // settled вызывается как за отклоненные, так и за выполненные действия
        settled: (state) => {
          state.status = 'none';
        },
      }
    ),
    updateUser: create.asyncThunk<User, DataUserUpdate>(
      async ({ userId, ...data }, thunkApi) => {
        // const { dispatch, getState, fulfillWithValue } = thunkApi;
        try {
          const res = await axios.patch<User>('https://6ede402e6a352dfb.mokky.dev' + `/users/${userId}`, { ...data });
          // throw new Error('Custom Error');
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
        fulfilled: (state, action) => {
          state.status = 'none';
          state.error = null;
          state.user = action.payload;
        },
        rejected: (state, action) => {
          state.status = 'error';
          state.error = action.error;
        },
        // settled вызывается как за отклоненные, так и за выполненные действия
        settled: (state) => {
          state.status = 'none';
        },
      }
    ),
    initauthProfile: create.asyncThunk<User, void>(
      async (_, thunkApi) => {
        const token = sessionStorage.getItem('token');
        return await axios
          .get<User>('https://6ede402e6a352dfb.mokky.dev' + '/auth_me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            return res.data;
          })
          .catch((error) => {
            return thunkApi.rejectWithValue(`Ошибка авторизации: ${error} `);
            //return error;
          });
      },
      {
        pending: (state) => {
          state.status = 'loading';
        },
        rejected: (state, action) => {
          state.status = 'error';
          state.error = action.error;
        },
        fulfilled: (state, action) => {
          state.status = 'none';
          state.user = action.payload;
        },
        // settled вызывается как за отклоненные, так и за выполненные действия
        settled: (state) => {
          state.status = 'none';
        },
      }
    ),
    getauthProfile: create.asyncThunk<User, string>(
      async (userId, thunkApi) => {
        const token = sessionStorage.getItem('token');
        return await axios
          .get<User>('https://6ede402e6a352dfb.mokky.dev' + `/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            return res.data;
          })
          .catch((error) => {
            return thunkApi.rejectWithValue(`Ошибка авторизации: ${error} `);
            //return error;
          });
      },
      {
        pending: (state) => {
          state.status = 'loading';
        },
        rejected: (state, action) => {
          state.status = 'error';
          state.error = action.error;
        },
        fulfilled: (state, action) => {
          state.status = 'none';
          state.user = action.payload;
        },
        // settled вызывается как за отклоненные, так и за выполненные действия
        settled: (state) => {
          state.status = 'none';
        },
      }
    ),
    deleteUser: create.asyncThunk<AxiosError | void, string>(
      async (user_id, thunkApi) => {
        try {
          await axios.delete('https://6ede402e6a352dfb.mokky.dev' + `/users/${user_id}`);
        } catch (error) {
          const err = error as AxiosError;
          return thunkApi.rejectWithValue({
            message: 'Ошибка при удалении файла: ' + err.message,
            additionalMessage: (err.response as AxiosResponse)?.data.message,
            code: err.status || (err.response as AxiosResponse)?.data.statusCode,
          } as ResponseError);
        }
      },
      {
        pending: (state) => {
          state.status = 'loading';
        },
        rejected: (state, action) => {
          state.status = 'error';
          state.error = action.payload as ResponseError;
        },
        fulfilled: (state) => {
          state.status = 'none';
          state.user = null;
        },
        // settled вызывается как за отклоненные, так и за выполненные действия
        settled: (state) => {
          state.status = 'none';
        },
      }
    ),
  }),
  selectors: {
    selectUser: (state) => state.user,
    selectStatusUser: (state) => state.status,
  },
});

export const { deleteUser, registerUser, setauthProfile, initauthProfile, updateUser } = authProfileSlice.actions;
export const { selectUser, selectStatusUser } = authProfileSlice.selectors;
