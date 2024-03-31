import axios from 'axios';
import { AuthApiResponse, LoginData } from '../types/authUserChema';
export const fetchAuthUser = async (loginData: LoginData) => {
  const response = await axios.post<AuthApiResponse>('https://6ede402e6a352dfb.mokky.dev/auth', loginData, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
