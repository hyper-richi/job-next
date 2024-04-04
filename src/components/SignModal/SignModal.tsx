'use client';
import { Modal, Button, Group, PasswordInput, TextInput, Stack, FileButton } from '@mantine/core';
import { useCallback, useRef, useState } from 'react';
import { FormValues } from '../../..';
import { IconPhoto, IconTrash } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { loginUser, registrUser } from '@/app/lib/store/features/auth/slice/authUserSlice';
import CustomNotification from '../CustomNotification/CustomNotification';
import { ResponseError } from '@/app/lib/store/features/file/types/fileSchema';
import { fetchDeleteFile } from '@/app/lib/store/features/file/api/data';
import { selectFile, selectStatusUploadFile, uploadFile } from '@/app/lib/store/features/file/slice/fileSlice';
import CustomAvatar from '../CustomAvatar/CustomAvatar';
import { RegistrData } from '@/app/lib/store/features/auth/types/authUserChema';
import { useForm } from '@mantine/form';

function SignModal({ opened, onClose }: { opened: boolean; onClose: () => void }) {
  const resetRef = useRef<() => void>(null);
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useAppDispatch();
  const file = useAppSelector(selectFile);
  // const fileError = useAppSelector(selectFileError);
  const statusUploadFile = useAppSelector(selectStatusUploadFile);

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
        const userData = await dispatch(registrUser(registrData)).unwrap();
        localStorage.setItem('token', userData.token);
        form.reset();
        onClose();
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
        const userData = await dispatch(loginUser(loginData)).unwrap();
        localStorage.setItem('token', userData.token);

        CustomNotification({
          title: 'Пользователь',
          message: 'Поздравляю! Вы успешно авторизовались!',
          variant: 'succes',
        });
        form.reset();
        onClose();
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

  async function handleUploadImgAvatar(fileFormUpload: File | null) {
    const formData = new FormData();
    if (fileFormUpload) {
      formData.append('file', fileFormUpload);
    }
    if (file?.id) {
      await fetchDeleteFile(file?.id);
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
        await fetchDeleteFile(file?.id);
        CustomNotification({
          title: 'Аватар',
          message: 'Фотография аватара успешно удалена!',
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
    }
  }, [file]);

  return isLogin ? (
    <Modal className='Authentication' opened={opened} onClose={onClose} title='Authentication'>
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
          <Button variant='default' onClick={() => setIsLogin((isLogin) => !isLogin)}>
            Registration account
          </Button>
          <Button type='submit'>Sign in</Button>
        </Group>
      </form>
    </Modal>
  ) : (
    <Modal className='Registration' opened={opened} onClose={onClose} title='Registration'>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack gap='xs'>
          <CustomAvatar src={file?.url} spinner={statusUploadFile === 'loading'} />
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
          label='Username'
          placeholder='Username'
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
            Login to account
          </Button>
          <Button type='submit'>Создать</Button>
        </Group>
      </form>
    </Modal>
  );
}

export default SignModal;
