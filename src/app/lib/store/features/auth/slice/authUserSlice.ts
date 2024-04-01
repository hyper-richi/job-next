import { type PayloadAction } from '@reduxjs/toolkit';
import { fetchAuthUser, fetchDeleteUser } from '../api/data';
import { AuthApiResponse, AuthUserSchema, LoginData } from '../types/authUserChema';
import { createAppSlice } from '../../../createAppSlice';

const initialState: AuthUserSchema = {
  status: 'idle',
  authUser: null,
  error: null,
};

export const authUserSlice = createAppSlice({
  name: 'authUser',
  initialState,
  reducers: (create) => ({
    logoutUser: create.reducer((state) => {
      state.authUser = null;
    }),
    loginUser: create.asyncThunk<AuthApiResponse, LoginData>(
      async (loginData, thunkApi) => {
        try {
          const response = await fetchAuthUser(loginData);
          return response;
        } catch (error) {
          console.error('Error fetch user:', error);
          return thunkApi.rejectWithValue('error');
        }
      },
      {
        pending: (state) => {
          state.status = 'loading';
        },
        rejected: (state, action) => {
          state.status = 'failed';
          state.error = action.error;
        },
        fulfilled: (state, action: PayloadAction<AuthApiResponse>) => {
          state.status = 'idle';
          state.authUser = action.payload.data;
        },
        // settled вызывается как за отклоненные, так и за выполненные действия
        settled: (state) => {
          state.status = 'idle';
        },
      }
    ),
    deleteUser: create.asyncThunk<void, string>(
      async (userId) => {
        const response = await fetchDeleteUser(userId);
        return response;
      },
      {
        pending: (state) => {
          state.status = 'loading';
        },
        rejected: (state, action) => {
          state.status = 'failed';
          state.error = action.error;
        },
        fulfilled: (state, action) => {
          state.status = 'idle';
          state.authUser = null;
        },
        // settled вызывается как за отклоненные, так и за выполненные действия
        settled: (state) => {
          state.status = 'idle';
        },
      }
    ),
  }),
  selectors: {
    selectAuthUser: (state) => state.authUser,
    selectStatusAuth: (state) => state.status,
  },
});

export const { loginUser, logoutUser, deleteUser } = authUserSlice.actions;
export const { selectAuthUser } = authUserSlice.selectors;
