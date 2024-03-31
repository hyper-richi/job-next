import { type PayloadAction } from '@reduxjs/toolkit';
import { fetchAuthUser } from '../api/authUserApi';
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
    loginUser: create.asyncThunk<AuthApiResponse, LoginData>(
      async (loginData) => {
        const response = await fetchAuthUser(loginData);
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
  }),
  selectors: {
    selectAuthUser: (state) => state.authUser,
    selectStatusAuth: (state) => state.status,
  },
});

export const { loginUser } = authUserSlice.actions;
export const { selectAuthUser } = authUserSlice.selectors;
