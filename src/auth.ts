import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { AuthApiResponse } from './app/lib/store/features/auth/types/authUserSchema';
import axios, { AxiosError } from 'axios';

async function authUser(email: string, password: string): Promise<AuthApiResponse | undefined> {
  try {
    const dataLogin = { email, password };
    const res = await axios.post<AuthApiResponse>('https://6ede402e6a352dfb.mokky.dev/auth', dataLogin);
    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error('Failed to fetch user:', err);
    throw new Error('Failed to fetch user.');
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
          const authData = await authUser(credentials.email as string, credentials.password as string);
          console.log('authData: ', authData);
          if (authData) {
            return authData.data;
          } else return null;
        } catch (err) {
          console.log('err: Invalid credentials', err);
          throw new Error('Error', err as Error);
          return null;
        }
      },
    }),
  ],
});
