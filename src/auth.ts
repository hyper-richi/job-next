import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { CredentialsSignin } from 'next-auth';
import { authUser } from './app/lib/api/data';
import { User } from './app/lib/store/features/user/types/userSchema';

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
        const loginData = {
          email: credentials.email as string,
          password: credentials.password as string,
        };
        try {
          const res = await authUser(loginData);
          // const userData = { ...res.data, token: res.token };
          return res.data;
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
