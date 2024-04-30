'use client';
import { Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { FormValues } from '../../..';
import { useForm } from '@mantine/form';
import { useFormState } from 'react-dom';
import { login, logout } from '@/app/lib/actions';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { LoginData } from '@/app/lib/store/features/user/types/userSchema';
import CustomNotification from '../CustomNotification/CustomNotification';

export interface Payload {
  loginData: LoginData;
  callbackUrl: string | null;
}

type StatusForm = 'idle' | 'success' | 'error';

type SignUpFormInitialStateT = {
  error: boolean;
  message: string;
  validatedErrors?: InputErrorsT;
  credentials?: {
    message: string;
    statusCode: number;
    error: string;
  };
};

type SignUpFormErrorStateT = {
  error: boolean;
  message: string;
  validatedErrors?: InputErrorsT;
  credentials?: {
    message: string;
    statusCode: number;
    error: string;
  };
};

export type InputErrorsT = {
  email?: string[];
  password?: string[];
};

export type SignUpFormStateT = SignUpFormInitialStateT | SignUpFormErrorStateT;

const initialState: SignUpFormInitialStateT = {
  error: false,
  message: '',
  // status: 'idle',
};

export default function AuthenticationForm({
  closeModal,
  setIsLogin,
}: {
  closeModal?: () => void;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}) {
  // const dispatch = useAppDispatch();
  // const file = useAppSelector(selectFile);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const { data: session } = useSession();

  const [formState, formAction] = useFormState<SignUpFormStateT, Payload>(login, initialState);

  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value)
          ? value.length <= 25
            ? null
            : 'Длина ящика не более 25 символов'
          : 'Минимальное наименование email n@m',
      username: (value) =>
        value && value.length < 2 ? 'Имя должно быть от 2' : value && value.length > 20 ? 'Имя должно быть до 20 символов' : null,
      password: (value) => {
        return value.length < 5 ? 'Минимальный пароль 5 символов' : null;
      },
    },
  });
  const loginData = { email: form.values.email, password: form.values.password };
  useEffect(() => {
    form.setFieldError('email', formState.validatedErrors?.email);
  }, [formState.validatedErrors?.email]);

  useEffect(() => {
    form.setFieldError('password', formState.validatedErrors?.password);
  }, [formState.validatedErrors?.password]);

  useEffect(() => {
    if (formState.error) {
      CustomNotification({
        title: 'Пользователь',
        message: formState.credentials?.message ?? formState.message,
        variant: 'error',
        statusCode: formState.credentials?.statusCode,
      });
    }
  }, [formState.credentials]);

  const toogleForm = () => {
    if (setIsLogin) {
      setIsLogin((isLogin: boolean) => !isLogin);
    }
  };

  return (
    <form action={() => formAction({ loginData, callbackUrl })}>
      <TextInput label='email' placeholder='your@email.com' required {...form.getInputProps('email')} error={form.errors.email} />
      <PasswordInput
        mt='md'
        withAsterisk
        label='password'
        placeholder='Your password'
        required
        {...form.getInputProps('password')}
        error={form.errors.password}
      />
      <p>email:{session && session?.user?.email}</p>
      <p>username:{session && session?.user.username}</p>
      <Group style={{ fontWeight: '400 !important' }} mt='md' justify='space-between'>
        <Button variant='default' onClick={toogleForm}>
          Регистрация
        </Button>
        <Button style={{ background: '#005bff' }} type='submit' /* onClick={() => signIn('credentials', loginData)} */>
          Войти
        </Button>
        <Button style={{ background: '#005bff' }} onClick={() => logout()}>
          Выйти
        </Button>
      </Group>
    </form>
  );
}
