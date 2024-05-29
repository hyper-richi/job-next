'use client';
import { Modal } from '@mantine/core';
import { useState } from 'react';
import AuthenticationForm from '../../Forms/AuthenticationForm/AuthenticationForm';
import RegistrationForm from '../../Forms/RegistrationForm/RegistrationForm';

function ModalSignin({ opened, closeModal }: { opened: boolean; openModal?: () => void; closeModal: () => void }) {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? (
    <Modal className='Authentication' opened={opened} onClose={closeModal} title='Авторизация'>
      <AuthenticationForm setIsLogin={setIsLogin} />
    </Modal>
  ) : (
    <Modal className='Registration' opened={opened} onClose={closeModal} title='Регистрация'>
      <RegistrationForm setIsLogin={setIsLogin} />
    </Modal>
  );
}

export default ModalSignin;
