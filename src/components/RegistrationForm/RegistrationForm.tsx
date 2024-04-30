'use client';
import { Button, FileButton, Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { FormValues, ResponseError } from '../../..';
import { useForm } from '@mantine/form';
import { useFormState } from 'react-dom';
import { login, logout } from '@/app/lib/actions';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { LoginData } from '@/app/lib/store/features/user/types/userSchema';
import CustomNotification from '../CustomNotification/CustomNotification';
import CustomAvatar from '../CustomAvatar/CustomAvatar';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { deleteFile, selectFile, uploadFile } from '@/app/lib/store/features/file/slice/fileSlice';
import { IconPhoto, IconTrash } from '@tabler/icons-react';

export interface Payload {
  loginData: LoginData;
  callbackUrl: string | null;
}

type SignInFormInitialState = {
  error: boolean;
  message: string;
  validatedErrors?: InputErrors;
  credentials?: {
    message: string;
    statusCode: number;
    error: string;
  };
};

type SignInFormErrorState = {
  error: boolean;
  message: string;
  validatedErrors?: InputErrors;
  credentials?: {
    message: string;
    statusCode: number;
    error: string;
  };
};

export type InputErrors = {
  email?: string[];
  password?: string[];
};

export type SignInFormState = SignInFormInitialState | SignInFormErrorState;

const initialState: SignInFormInitialState = {
  error: false,
  message: '',
  // status: 'idle',
};

export default function RegistrationForm({
  closeModal,
  setIsLogin,
}: {
  closeModal?: () => void;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}) {
  // const [isLogin, setIsLogin] = useState(true);

  const dispatch = useAppDispatch();
  const file = useAppSelector(selectFile);
  const resetRef = useRef<() => void>(null);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const { data: session } = useSession();

  const [formState, formAction] = useFormState<SignInFormState, Payload>(login, initialState);

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

  async function handleUploadImgAvatar(fileFormUpload: File | null) {
    const formData = new FormData();
    if (fileFormUpload) {
      formData.append('file', fileFormUpload);
    }
    if (file?.id) {
      await dispatch(deleteFile(file?.id));
    }

    try {
      await dispatch(uploadFile(formData)).unwrap();
    } catch (rejectedError) {
      const rejectValue = rejectedError as ResponseError;
      CustomNotification({
        title: rejectValue.code,
        message: rejectValue.message,
        additionalMessage: rejectValue.additionalMessage,
        variant: 'error',
      });
    }
  }

  const handleDeleteImgAvatar = useCallback(async () => {
    if (file?.id) {
      try {
        await dispatch(deleteFile(file?.id));
        CustomNotification({
          title: 'Аватар',
          message: 'Фотография аватара успешно удалена!',
          variant: 'success',
        });
      } catch (rejectedError) {
        const rejectValue = rejectedError as ResponseError;

        CustomNotification({
          title: rejectValue.code,
          message: rejectValue.message,
          additionalMessage: rejectValue.additionalMessage,
          variant: 'error',
        });
      }
    }
  }, [file]);

  const toogleForm = () => {
    if (setIsLogin) {
      setIsLogin((isLogin: boolean) => !isLogin);
    }
  };

  return (
    <>
      <form action={() => formAction({ loginData, callbackUrl })}>
        <Stack gap='xs'>
          <CustomAvatar />
          <Group justify='space-between'>
            <FileButton resetRef={resetRef} onChange={handleUploadImgAvatar} accept='image/*'>
              {(props) => (
                <Button variant='default' {...props} leftSection={<IconPhoto size={18} />} style={{ lineHeight: '25px' }}>
                  {file ? 'Сменить' : 'Добавить фото'}
                </Button>
              )}
            </FileButton>
            <Button
              onClick={handleDeleteImgAvatar}
              leftSection={<IconTrash size={18} />}
              variant='default'
              style={{ lineHeight: '25px' }}
            >
              Удалить
            </Button>
          </Group>
        </Stack>
        <TextInput
          mt='md'
          label='username'
          placeholder='username'
          required
          {...form.getInputProps('username')}
          error={form.errors.username}
        />
        <TextInput label='email' placeholder='your@email.com' required {...form.getInputProps('email')} error={form.errors.email} />
        <PasswordInput
          mt='md'
          label='password'
          placeholder='Your password'
          required
          {...form.getInputProps('password')}
          error={form.errors.password}
        />
        <Group mt='md' justify='space-between'>
          <Button variant='default' onClick={() => setIsLogin((isLogin) => !isLogin)}>
            Авторизация
          </Button>
          <Button style={{ background: '#005bff' }} type='submit'>
            Создать
          </Button>
        </Group>
      </form>
    </>
  );
}
