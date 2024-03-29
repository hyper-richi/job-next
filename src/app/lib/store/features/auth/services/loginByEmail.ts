import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUserSchema } from '../../user/types/userSchema';
import axios from 'axios';
import { userActions } from '../../user/slice/userSlice';
// import { userActions } from '../../user/slice/userSlice';

interface LoginByEmailProps {
  email: string;
  password: string;
}

export const loginByEmail = createAsyncThunk<AuthUserSchema, LoginByEmailProps, { rejectValue: string }>(
  'login/loginByEmail',
  async (loginData, thunkApi) => {
    try {
      const response = await axios.post<AuthUserSchema>('https://6ede402e6a352dfb.mokky.dev/auth', loginData, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      console.log('auth-response: ', response.data);

      if (!response.data) {
        throw new Error();
      }
      //localStorage.setItem('token', response.data.authData.token);
      thunkApi.dispatch(userActions.setAuthData(response.data));
      return response.data;
    } catch (e) {
      console.log(e);
      return thunkApi.rejectWithValue('error');
    }
  }
);
