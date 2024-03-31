'use client';
import { Modal, Button, Group, PasswordInput, TextInput, Avatar, Stack, FileButton } from '@mantine/core';
import { useRef, useState } from 'react';
import { useForm } from '@mantine/form';
import { FormValues, ImageFile } from '../../..';
import { IconPhoto, IconTrash } from '@tabler/icons-react';
import { useAppDispatch } from '@/app/lib/store/hooks';
import { loginUser } from '@/app/lib/store/features/auth/slice/authUserSlice';

function SignModal({ opened, onClose }: { opened: boolean; onClose: () => void }) {
  // @ts-ignore

  const resetRef = useRef<() => void>(null);
  const [profilePic, setProfilePic] = useState<ImageFile | null>(null);
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useAppDispatch();

  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      username: (value) => (value && value.length < 2 ? 'Too short name' : null),
      password: (value) => (value.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const handleSubmit = async (values: FormValues) => {
    if (values.username) {
      try {
        const res = await fetch('https://6ede402e6a352dfb.mokky.dev/register', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: values.username,
            email: values.email,
            password: values.password,
            avatar: {
              url: profilePic?.url,
              id_picture: profilePic?.id,
            },
          }),
        });

        if (res.ok) {
          const regData = await res.json();
          localStorage.setItem('token', regData.token);
          form.reset();
          onClose();
        }
      } catch (error) {
        console.log(error);
      }
      return;
    } else {
      try {
        const loginData = { email: values.email, password: values.password };
        dispatch(loginUser(loginData));
        form.reset();
        onClose();
      } catch (error) {
        console.log(error);
      }
    }
  };

  async function uploadFile(file: File | null) {
    const formData = new FormData();
    file && formData.append('file', file);

    const res = await fetch('https://6ede402e6a352dfb.mokky.dev/uploads', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const json: ImageFile = await res.json();
      setProfilePic(json);
      form.setFieldValue('avatar', json.url);
      console.log('upload file:', json);
    }
  }

  async function deleteFile() {
    const res = await fetch(`https://6ede402e6a352dfb.mokky.dev/uploads/${profilePic?.id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      // const json = await res.json();
      setProfilePic(null);
      console.log('delete file:', res);
    }
  }

  return isLogin ? (
    <Modal className='Authentication' opened={opened} onClose={onClose} title='Authentication'>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          label='email'
          placeholder='your@email.com'
          required
          {...form.getInputProps('email')}
          error={form.errors.email && 'Invalid email'}
        />
        <PasswordInput
          mt='md'
          withAsterisk
          label='password'
          placeholder='Your password'
          required
          {...form.getInputProps('password')}
          error={form.errors.password && 'Password should include at least 6 characters'}
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
          <Group justify='center'>
            <Avatar m='sm' size='lg' src={profilePic?.url} alt='profile picture' style={{ width: '76px', height: ' 76px' }} />
          </Group>
          <Group justify='space-between'>
            <FileButton resetRef={resetRef} onChange={uploadFile} accept='image/*'>
              {(props) => (
                <Button variant='default' {...props} leftSection={<IconPhoto size={18} />} style={{ lineHeight: '25px' }}>
                  {profilePic ? 'Сменить' : 'Добавить фото'}
                </Button>
              )}
            </FileButton>
            <Button onClick={deleteFile} leftSection={<IconTrash size={18} />} variant='default' style={{ lineHeight: '25px' }}>
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
          error={form.errors.username && 'Too short username'}
        />

        <TextInput
          label='email'
          placeholder='your@email.com'
          required
          {...form.getInputProps('email')}
          error={form.errors.email && 'Invalid email'}
        />
        <PasswordInput
          mt='md'
          label='password'
          placeholder='Your password'
          required
          {...form.getInputProps('password')}
          error={form.errors.password && 'Password should include at least 6 characters'}
        />
        <Group mt='md' justify='space-between'>
          <Button variant='default' onClick={() => setIsLogin((isLogin) => !isLogin)}>
            Login to account
          </Button>
          <Button type='submit'>Sign in</Button>
        </Group>
      </form>
    </Modal>
  );
}

export default SignModal;
