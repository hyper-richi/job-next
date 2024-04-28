import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { AuthApiResponse } from './app/lib/store/features/auth/types/authUserSchema';
import axios, { AxiosError } from 'axios';
import { CredentialsSignin } from 'next-auth';

async function authUser(email: string, password: string) {
  const dataLogin = { email, password };
  return await axios.post<AuthApiResponse>('https://6ede402e6a352dfb.mokky.dev/auth', dataLogin).then((data) => {
    return data;
  });
}

class CustomAuthorizeError extends CredentialsSignin {
  message: string;
  statusCode: number;
  error: string;

  constructor(message: string, statusCode: number, error: string) {
    super(); //   в производных классах super() необходимо
    // вызывать, прежде чем использовать 'this'. Если этого не сделать, произойдет ошибка ReferenceError.

    this.message = message;
    this.statusCode = statusCode;
    this.error = error;
  }
}

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const res = await authUser(credentials.email as string, credentials.password as string);
          return res.data.data;
        } catch (error) {
          //@ts-ignore
          const message = error?.response?.data.message;
          //@ts-ignore
          const statusCode = error?.response?.data.statusCode;
          //@ts-ignore
          const errorMes = error?.response?.data.error;
          throw new CustomAuthorizeError(message, statusCode, errorMes);
          //return null;
        }
      },
    }),
  ],
});
