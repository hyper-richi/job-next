// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthUserSchema } from '../types/userSchema';
import { LoginByEmailProps } from '../../../../../../..';
import { fetchAuthUser } from '../api/userAPI';
import { createAppSlice } from '../../../createAppSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { loginByEmail } from '../../auth/services/loginByEmail';
// import { loginByEmail } from '../../auth/services/loginByEmail';

const initialState: AuthUserSchema = {
  authData: null,
  isLoading: false,
};

export const userSlice = createAppSlice({
  name: 'user',
  initialState,
  /* reducers: (create) => ({
    // позволяет нам выполнять асинхронную логику. Его  можно отправить как обычное действие: `dispatch(incrementAsync(10))`.
    // Это вызовет преобразователь с функцией `dispatch` в качестве первого аргумента. Затем можно выполнить асинхронный  код и
    // отправить другие действия.

    incUser: create.asyncThunk(
      async (loginData: LoginByEmailProps) => {
        const response = await fetchAuthUser(loginData);
        return response;
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          state.authData = action.payload.data.authData;
          console.log('action.payload.data.authData: ', action.payload.data.authData);
        },
        rejected: (state) => {
          state.isLoading = false;
        },
      }
    ),
  }), */
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthUserSchema>) => {
      if (action.payload.authData) {
        console.log('setAuthData: ', action.payload);

        state.authData = action.payload.authData;

        localStorage.setItem('token', action.payload.authData?.token);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginByEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginByEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authData = action.payload.authData;
        console.log('action.payload.authData: ', action.payload.authData);
      })
      .addCase(loginByEmail.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

// export const { incUserAsync } = userSlice.actions;

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
