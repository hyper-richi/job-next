'use client';

import AuthenticationForm from '@/components/AuthenticationForm/AuthenticationForm';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';
import { Anchor, Paper, Title, Text, Container } from '@mantine/core';
import { useState } from 'react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Container size={420} my={40}>
      <Title style={{ textAlign: 'center' }} order={2} textWrap='wrap'>
        Добро пожаловать!
      </Title>
      <Text c='dimmed' size='sm' mt={5}>
        Do not have an account yet?{' '}
        <Anchor<'a'> href='#' size='sm' onClick={(event) => event.preventDefault()}>
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        {isLogin ? <AuthenticationForm setIsLogin={setIsLogin} /> : <RegistrationForm setIsLogin={setIsLogin} />}
      </Paper>
    </Container>
  );
}
