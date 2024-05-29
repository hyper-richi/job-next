'use client';

import AuthenticationForm from '@/components/Forms/AuthenticationForm/AuthenticationForm';
import RegistrationForm from '@/components/Forms/RegistrationForm/RegistrationForm';
import { Paper, Title, Container } from '@mantine/core';
import { useState } from 'react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Container size={420} my={40}>
      <Title style={{ textAlign: 'center' }} order={2} textWrap='wrap'>
        {isLogin ? 'Авторизация!' : 'Регистрация!'}
      </Title>
      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        {isLogin ? <AuthenticationForm setIsLogin={setIsLogin} /> : <RegistrationForm setIsLogin={setIsLogin} />}
      </Paper>
    </Container>
  );
}
