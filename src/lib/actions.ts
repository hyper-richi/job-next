'use server';
import { signIn, signOut } from '../auth';
import { loginSchema } from './login.schema';
import { Payload, SignUpFormStateT } from '@/components/AuthenticationForm/AuthenticationForm';

export async function login(prevState: SignUpFormStateT, payload: Payload) {
  const { loginData, callbackUrl } = payload;
  try {
    const validatedFields = loginSchema.safeParse({
      email: loginData.email,
      password: loginData.password,
    });

    if (!validatedFields.success) {
      return {
        error: false,
        status: 'error',
        message: 'Please verify your data.',
        validatedErrors: validatedFields.error.flatten().fieldErrors,
      };
    }

    await signIn('credentials', {
      ...loginData,
      redirectTo: callbackUrl || '/vacancies',
    });

    return {
      error: false,
      status: 'success',
      message: 'Успешно',
    };
  } catch (error) {
    return {
      error: true,
      status: 'error',
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
  }
}

export async function logout() {
  await signOut({ redirectTo: '/' });
}
