import { type PayloadAction } from '@reduxjs/toolkit';
import { AuthApiResponse, UserSchema, RegisterData, User, DataUserUpdate } from '../types/userSchema';
import { createAppSlice } from '../../../createAppSlice';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ResponseError } from '../../../../../../..';

const initialState: UserSchema = {
  status: 'none',
  user: null,
  error: null,
};

export const userSlice = createAppSlice({
  name: 'user',
  initialState,
  reducers: (create) => ({
    setAuthUser: create.reducer((state, action: PayloadAction<User>) => {
      state.user = action.payload;
    }),
    registerUser: create.asyncThunk<AuthApiResponse, RegisterData>(
      async (registrData, thunkApi) => {
        // const { dispatch, getState, fulfillWithValue } = thunkApi;
        try {
          const res = await axios.post<AuthApiResponse>('https://6ede402e6a352dfb.mokky.dev/register', registrData);
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
        fulfilled: (state, action: PayloadAction<AuthApiResponse>) => {
          state.status = 'none';
          state.error = null;
          state.user = action.payload.user;
          sessionStorage.setItem('token', action.payload.token);
        },
        // settled вызывается как за отклоненные, так и за выполненные действия
        settled: (state) => {
          state.status = 'none';
        },
      }
    ),
    updateUser: create.asyncThunk<User, DataUserUpdate>(
      async ({ userId, ...data }, thunkApi) => {
        console.log('data: ', data);
        // const { dispatch, getState, fulfillWithValue } = thunkApi;
        try {
          const res = await axios.patch<User>('https://6ede402e6a352dfb.mokky.dev/users/' + userId, { ...data });
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
          state.user = action.payload;
        },
        // settled вызывается как за отклоненные, так и за выполненные действия
        settled: (state) => {
          state.status = 'none';
        },
      }
    ),
    initAuthUser: create.asyncThunk<User, void>(
      async (_, thunkApi) => {
        const token = sessionStorage.getItem('token');
        return await axios
          .get<User>('https://6ede402e6a352dfb.mokky.dev/auth_me', {
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
    getAuthUser: create.asyncThunk<User, string>(
      async (userId, thunkApi) => {
        const token = sessionStorage.getItem('token');
        return await axios
          .get<User>('https://6ede402e6a352dfb.mokky.dev/users/' + userId, {
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
          await axios.delete(`https://6ede402e6a352dfb.mokky.dev/users/${user_id}`);
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

export const { deleteUser, registerUser, setAuthUser, initAuthUser, updateUser } = userSlice.actions;
export const { selectUser, selectStatusUser } = userSlice.selectors;
