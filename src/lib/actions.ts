'use server';

import { AuthError } from 'next-auth';
import { signIn, signOut } from '../auth';
import { redirect } from 'next/navigation';
import { LoginData } from '@/app/lib/store/features/auth/types/authUserSchema';

const defaultValues = {
  email: '',
  password: '',
};

export async function login(prevState: any, payload: any) {
  try {
    //await signIn('credentials', formData);
    await signIn('credentials', { ...payload.loginData, redirectTo: payload.callbackUrl || '/vacancies' });

    return {
      message: 'success',
      errors: {},
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            message: 'credentials error',
            errors: {
              ...defaultValues,
              credentials: 'incorrect email or password',
            },
          };
        default:
          return {
            message: 'unknown error',
            errors: {
              ...defaultValues,
              unknown: 'unknown error',
            },
          };
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: '/' });
}
