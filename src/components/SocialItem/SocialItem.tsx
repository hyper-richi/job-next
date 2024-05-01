import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { ActionIcon, Divider, Input, List, rem } from '@mantine/core';
import styles from './SocialItem.module.scss';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useClickOutside, useDisclosure, useFocusTrap, useMergedRef } from '@mantine/hooks';
import { DataUserUpdate, User } from '@/app/lib/store/features/user/types/userSchema';
import { useAppDispatch } from '@/app/lib/store/hooks';
import { updateUser } from '@/app/lib/store/features/user/slice/userSlice';
import { ResponseError } from '../../..';
import { NameInput } from '@/components/ProfieClient/ProfileClient';
import { Skeleton } from '../Skeleton/Skeleton';

interface SocialItemProps {
  icon: ReactNode;
  placeholder: string;
  nameInput: NameInput;
  authUser?: User | null;
}

const SocialItem = ({ icon, placeholder, authUser, nameInput }: SocialItemProps) => {
  const [value, setValue] = useState('');
  const [loading, setLoadingSave] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [active, { toggle }] = useDisclosure(false);
  const dispatch = useAppDispatch();

  const myRef = useRef();

  const useClickOutsideRef = useClickOutside(() => {
    setLoadingSave(false);
    setIsInput((prevIsInput) => !prevIsInput);
    if (!loading) {
    }
  });

  useEffect(() => {
    if (!loading) {
      setIsInput((prevIsInput) => !prevIsInput);
    }
  }, [loading]);

  const focusTrapRef = useFocusTrap();
  const mergedRef = useMergedRef(myRef, useClickOutsideRef, focusTrapRef);

  const handleSetIsInput = () => {
    setIsInput((prevIsInput) => !prevIsInput);
    toggle();
  };

  const handleUpdateUser = useCallback(async () => {
    try {
      /* const updateData: DataUserUpdate = {
        userId: authUser.id,
        [nameInput]: value,
      };
      await dispatch(updateUser(updateData)).unwrap(); */
      /*  CustomNotification({
          title: 'Пользователь',
          message: 'Пользователь успешно создан!',
          variant: 'success',
        }); */
    } catch (rejectedError) {
      const rejectValue = rejectedError as ResponseError;
      /*  CustomNotification({
          title: rejectValue.code,
          message: rejectValue.message,
          additionalMessage: rejectValue.additionalMessage,
          variant: 'error',
        }); */
    }
  }, [value, nameInput]);

  return (
    <>
      <List.Item className={styles.social} icon={icon}>
        {isInput ? (
          <div ref={mergedRef} style={{ width: '100%' }}>
            <Input
              data-autofocus
              variant='filled'
              className={styles.input}
              placeholder={placeholder}
              value={value}
              onChange={(event) => setValue(event.currentTarget.value)}
              rightSectionPointerEvents='all'
              rightSection={
                <ActionIcon
                  className={styles.save__button}
                  loaderProps={{ color: 'green', width: 24, height: 24 }}
                  loading={loading}
                  size={22}
                  variant='default'
                  onClick={handleUpdateUser}
                  aria-label='ActionIcon'
                >
                  <IconDeviceFloppy style={{ width: rem(22), height: rem(22) }} />
                </ActionIcon>
              }
            />
          </div>
        ) : authUser ? (
          <span onClick={handleSetIsInput} className={styles.notif}>
            {authUser?.[nameInput] || '...заполните поле'}:
          </span>
        ) : (
          <Skeleton minWidth={'100%'} height={'28px'} />
        )}
      </List.Item>
      <Divider />
    </>
  );
};

export default SocialItem;
