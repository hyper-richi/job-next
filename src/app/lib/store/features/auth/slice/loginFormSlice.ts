import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginFormSchema } from '../types/loginFormSchema';
import { loginByEmail } from '../services/loginByEmail';

const initialState: LoginFormSchema = {
  isLoading: false,
  email: '',
  password: '',
};

export const loginFormSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginByEmail.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(loginByEmail.fulfilled, (state, action) => {
        console.log('loginByEmail.fulfilled: ');
        state.isLoading = false;
      })
      .addCase(loginByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: loginFormActions } = loginFormSlice;
export const { reducer: loginFormReducer } = loginFormSlice;
