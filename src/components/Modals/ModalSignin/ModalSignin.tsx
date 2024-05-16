'use client';
import { Modal } from '@mantine/core';
import { useCallback, useRef, useState } from 'react';
import { FormValues, ResponseError } from '../../../..';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import CustomNotification from '../../CustomNotification/CustomNotification';
import { deleteFile, selectFile, uploadFile } from '@/app/lib/store/features/file/slice/fileSlice';
import { useForm } from '@mantine/form';
import AuthenticationForm from '../../Forms/AuthenticationForm/AuthenticationForm';
import RegistrationForm from '../../Forms/RegistrationForm/RegistrationForm';

function ModalSignin({ opened, openModal, closeModal }: { opened: boolean; openModal: () => void; closeModal: () => void }) {
  const resetRef = useRef<() => void>(null);
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useAppDispatch();
  const file = useAppSelector(selectFile);
  // const fileError = useAppSelector(selectFileError);
  //const statusUploadFile = useAppSelector(selectStatusUploadFile);

  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value)
          ? value.length <= 25
            ? null
            : 'Длина ящика не более 25 символов'
          : 'Минимальное наименование email n@m',
      name: (value) =>
        value && value.length < 2 ? 'Имя должно быть от 2' : value && value.length > 20 ? 'Имя должно быть  до 20 символов' : null,
      password: (value) => {
        return value.length < 5 ? 'Минимальный пароль 5 символов' : null;
      },
    },
  });

  /* const handleSubmit = async (values: FormValues) => {
    if (values.name) {
      // Registration
      const registerData: RegisterUserData = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      try {
        await dispatch(registerUser(registerData)).unwrap();

        form.reset();
        closeModal();

        CustomNotification({
          title: 'Пользователь',
          message: 'Пользователь успешно создан!',
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
    } else {
      // Authentication
      try {
        const loginData = { email: values.email, password: values.password };

         await dispatch(loginUser(loginData)).unwrap();
           CustomNotification({
          title: 'Пользователь',
          message: 'Поздравляю! Вы успешно авторизовались!',
          variant: 'success',
        });
         form.reset();
        closeModal();
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
