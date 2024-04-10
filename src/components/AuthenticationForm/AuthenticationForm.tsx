'use client';
import { Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import { FormValues, ResponseError } from '../../..';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { loginUser, registerUser } from '@/app/lib/store/features/auth/slice/authUserSlice';
import CustomNotification from '../CustomNotification/CustomNotification';
import { selectFile } from '@/app/lib/store/features/file/slice/fileSlice';
import { RegistrData } from '@/app/lib/store/features/auth/types/authUserSchema';
import { useForm } from '@mantine/form';

function AuthenticationForm({ closeModal, setIsLogin }: { closeModal?: () => void; setIsLogin?: Dispatch<SetStateAction<boolean>> }) {

  const dispatch = useAppDispatch();
  const file = useAppSelector(selectFile);

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
        value && value.length < 2 ? 'Имя должно быть от 2' : value && value.length > 20 ? 'Имя должно быть  до 20 символов' : null,
      password: (value) => {
        return value.length < 5 ? 'Минимальный пароль 5 символов' : null;
      },
    },
  });

  const handleSubmit = async (values: FormValues) => {
    if (values.username) {
      // Registration
      const registrData: RegistrData = {
        username: values.username,
        email: values.email,
        password: values.password,
        avatar: {
          url: file?.url,
          id_picture: file?.id,
        },
      };
      try {
        await dispatch(registerUser(registrData)).unwrap();
        form.reset();

        if (closeModal) {
          closeModal();
        }
        CustomNotification({
          title: 'Пользователь',
          message: 'Пользователь успешно создан!',
          variant: 'succes',
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
    } else {
      // Authentication
      try {
        const loginData = { email: values.email, password: values.password };
        await dispatch(loginUser(loginData)).unwrap();

        CustomNotification({
          title: 'Пользователь',
          message: 'Поздравляю! Вы успешно авторизовались!',
          variant: 'succes',
        });
        form.reset();

        if (closeModal) {
          closeModal();
        }
      } catch (rejectedError) {
        const rejectValue = rejectedError as ResponseError;
        CustomNotification({
          message: rejectValue.message,
          additionalMessage: rejectValue.additionalMessage,
          variant: 'error',
        });
      }
    }
  };

  const toogleForm = () => {
    if (setIsLogin) {
      setIsLogin((isLogin: boolean) => !isLogin);
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
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
      <Group style={{ fontWeight: '400 !important' }} mt='md' justify='space-between'>
        <Button variant='default' onClick={toogleForm}>
          Регистрация
        </Button>
        <Button style={{ background: '#005bff' }} type='submit'>
          Войти
        </Button>
      </Group>
    </form>
  );
}

export default AuthenticationForm;
