// import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, PasswordInput, TextInput, FileInput, Avatar, Pill, Badge } from '@mantine/core';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { FormValues, ImageFile } from '../../..';

function SignModal({ onCloseAuthModal, showAuthModal }: { showAuthModal: boolean; onCloseAuthModal: () => void }) {
  // const [opened, { open, close }] = useDisclosure(false);

  const [profilePic, setProfilePic] = useState<ImageFile>();

  const [isLogin, setIsLogin] = useState(true);

  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      name: '',
      username: '',
      avatar: '',
      password: '',
    },

    validate: {
      email: (val: string) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      name: (value: string | null) => (value && value.length < 2 ? 'Too short name' : null),
      username: (value: string | null) => (value && value.length < 2 ? 'Too short name' : null),
      avatar: (value: string) => (value && value.length < 2 ? 'Avatar should include picture' : null),
      password: (val: string) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  /* {
          email: values.email,
          name: values.name,
          password: values.password,
        } */

  const handleSubmit = async (values: FormValues) => {
    if (values.name) {
      try {
        const res = await fetch('https://6ede402e6a352dfb.mokky.dev/register', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: values.name,
            email: values.email,
            password: values.password,
            username: values.username,
            avatar: values.avatar,
          }),
        });

        if (res.ok) {
          const json = await res.json();
          console.log('json', json);
        }
        // form.reset();
      } catch (error) {
        console.log(error);
      }
      return;
    } else {
      try {
        console.log(values);
        form.reset();
        /*
      localStorage.setItem('token', data.token);
      */
      } catch (error) {
        console.log(error);
      }
    }
  };

  async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

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

  /* const handleChangeUpload = (payload: File | null) => {
    console.log('payload: ', payload);
    uploadFile(payload)
  }; */

  return isLogin ? (
    <Modal opened={showAuthModal} onClose={onCloseAuthModal} title='Authentication'>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          label='email'
          placeholder='your@email.com'
          required
          {...form.getInputProps('email')}
          // value={form.values.email}
          // onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
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
        <Group mt='md' justify='space-between'>
          <Button variant='default' onClick={() => setIsLogin((isLogin) => !isLogin)}>
            Registration account
          </Button>
          <Button type='submit'>Sign in</Button>
        </Group>
      </form>
    </Modal>
  ) : (
    <Modal opened={showAuthModal} onClose={onCloseAuthModal} title='Registration'>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          mt='md'
          label='Name'
          placeholder='Name'
          required
          {...form.getInputProps('name')}
          error={form.errors.name && 'Too short name'}
        />
        <TextInput
          mt='md'
          label='username'
          placeholder='username'
          required
          {...form.getInputProps('username')}
          error={form.errors.username && 'Too short username'}
        />
        {profilePic && (
          <Group mt='md' justify='space-between'>
            <Avatar m='md' src={profilePic.url} alt='profile picture' />
            {/*  <Chip defaultChecked>Avatar</Chip> */}
            <Pill defaultChecked withRemoveButton>
              Avatar
            </Pill>
            <Badge color='blue'>Avatar</Badge>
            <TextInput required disabled {...form.getInputProps('avatar')} error={form.errors.email && 'Invalid avatar'} />
          </Group>
        )}
        {!profilePic && (
          <FileInput
            onChange={(file) => file && uploadFile(file)}
            label='Profile picture'
            required
            placeholder='Upload a profile picture'
            clearable
            //   accept="image/*"
            accept='image/png,image/jpeg,image/webp'
            // {...form.getInputProps('profilePicture')}
            error={form.errors.profilePicture && 'Too short username'}
          />
        )}
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
