'use server';
import { AuthError } from 'next-auth';
import { signIn, signOut } from '../auth';
import { loginSchema } from './login.schema';
import { Payload, SignUpFormStateT } from '@/components/AuthenticationForm/AuthenticationForm';

export async function login(prevState: SignUpFormStateT, payload: Payload) {
  const { loginData, callbackUrl } = payload;

  const validatedFields = loginSchema.safeParse({
    email: loginData.email,
    password: loginData.password,
  });

  if (!validatedFields.success) {
    return {
      error: false,
      message: 'Please verify your data.',
      validatedErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await signIn('credentials', {
      ...loginData,
      redirectTo: callbackUrl || '/vacancies',
    });

    return {
      error: false,
      message: 'Успешно',
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            error: true,
            message: 'Ошибка',
            credentials: {
              //@ts-ignore
              message: error.message,
              //@ts-ignore
              statusCode: error.statusCode,
              //@ts-ignore
              error: error.error,
            },
          };
        default:
          return {
            error: true,
            message: 'unknown error',
          };
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: '/' });
}
