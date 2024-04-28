'use client';
import { Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { FormValues } from '../../..';
import { useForm } from '@mantine/form';
import { useFormState } from 'react-dom';
import { login, logout } from '@/lib/actions';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { LoginData } from '@/app/lib/store/features/auth/types/authUserSchema';
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
  setIsLogin?: Dispatch<SetStateAction<boolean>>;
}) {
  // const dispatch = useAppDispatch();
  // const file = useAppSelector(selectFile);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const { data: session } = useSession();

  const [formState, formAction] = useFormState<SignUpFormStateT, Payload>(login, initialState);
  console.log('formState: ', formState);

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

  /* const handleSubmit = async ( values?: FormValues,  formData?: FormData) => {
    console.log('formData: ', formData);
    // const values = form.onSubmit((values) => values as FormValues);
    const values = form.values;
    console.log('values: ', values);
    console.log('formData: ', formData);
    if (values.username) {
      // Registration
      // const registrData: RegistrData = {
      //  username: values.username,
      //  email: values.email,
      //  password: values.password,
      //  avatar: {
      //    url: file?.url,
      //    id_picture: file?.id,
      //  },
      //};
      try {
        // await dispatch(registerUser(registrData)).unwrap();
        // form.reset();
        //  if (closeModal) {
        //  closeModal();
        //}
        // CustomNotification({
        //  title: 'Пользователь',
        //  message: 'Пользователь успешно создан!',
        //  variant: 'success',
        //});
      } catch (rejectedError) {
        const rejectValue = rejectedError as ResponseError;
        CustomNotification({
          title: rejectValue.code,
          message: rejectValue.message,
          additionalMessage: rejectValue.additionalMessage,
          variant: 'error',
        });
      }
    } else {
      // Authentication
      try {
        const loginData = { email: values.email, password: values.password };
        // await dispatch(loginUser(loginData)).unwrap();
        await signIn('credentials', { ...loginData, redirect: false, redirectTo: callbackUrl || '/vacancies' });

        CustomNotification({
          title: 'Пользователь',
          message: 'Поздравляю! Вы успешно авторизовались!',
          variant: 'success',
        });
        // form.reset();
        //
        //if (closeModal) {
        //  closeModal();
        //}
      } catch (rejectedError) {
        const rejectValue = rejectedError as ResponseError;
        CustomNotification({
          message: rejectValue.message,
          additionalMessage: rejectValue.additionalMessage,
          variant: 'error',
        });
      }
    }
  }; */

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
        {/*  <Button variant='default' onClick={toogleForm}>
          Регистрация
        </Button> */}
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

/* function LoginButton() {
  return (
    <button type='submit' className='mt-4 w-full'>
      Войти
    </button>
  );
} */
