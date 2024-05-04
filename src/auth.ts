import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { CredentialsSignin } from 'next-auth';
import { authUser } from './app/lib/api/data';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
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
  unstable_update,
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
          console.log('error: ', error);
          //@ts-ignore
          const message = error?.response?.data?.message || error.response?.statusText;
          //@ts-ignore
          const statusCode = error?.response?.data.statusCode || error.response?.status;
          //@ts-ignore
          const errorMes = error?.response?.data.error || error.code;
          throw new CustomAuthorizeError(message, statusCode, errorMes);
          //@ts-ignore

          //return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
});
// Account: YANDEX BROWSER (kamalov.fortech@gmail.com)
