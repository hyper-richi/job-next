import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { ActionIcon, Divider, Input, List, rem } from '@mantine/core';
import styles from './SocialItem.module.scss';
import { IconCheck, IconDeviceFloppy, IconExclamationCircle } from '@tabler/icons-react';
import { useClickOutside, useDisclosure, useFocusTrap, useMergedRef } from '@mantine/hooks';
import { DataUserUpdate, User } from '@/app/lib/store/features/user/types/userSchema';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { selectStatusUser, updateUser } from '@/app/lib/store/features/user/slice/userSlice';
import { ResponseError } from '../../..';
import { NameInput } from '@/components/ProfieClient/ProfileClient';
import { Skeleton } from '../Skeleton/Skeleton';
import { useSession } from 'next-auth/react';
import CustomNotification from '../CustomNotification/CustomNotification';

interface SocialItemProps {
  icon: ReactNode;
  placeholder: string;
  nameInput: NameInput;
  authUser: User;
}

type StatusUpdateInput = 'none' | 'success' | 'error';

const SocialItem = ({ icon, placeholder, authUser, nameInput }: SocialItemProps) => {
  const [value, setValue] = useState(authUser?.[nameInput]);
  const [loading, setLoadingSave] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState<StatusUpdateInput>('none');

  console.log('isInput: ', isInput);

  const [active, { toggle }] = useDisclosure(false);
  const dispatch = useAppDispatch();
  const { data: session, update } = useSession();
  const statusUser = useAppSelector(selectStatusUser);

  const myRef = useRef();

  const useClickOutsideRef = useClickOutside(() => {
    setLoadingSave(false);
    setIsInput((prevIsInput) => !prevIsInput);
    if (!loading) {
    }
  });

  const handleClick = useCallback(() => {}, []);

  /* useEffect(() => {
    if (!loading) {
      setIsInput((prevIsInput) => !prevIsInput);
    }
  }, [loading]); */

  const focusTrapRef = useFocusTrap();
  const mergedRef = useMergedRef(myRef, useClickOutsideRef, focusTrapRef);

  const handleSetIsInput = () => {
    setIsInput((prevIsInput) => !prevIsInput);
    toggle();
  };

  const handleUpdateUser = useCallback(async () => {
    try {
      const updateData: DataUserUpdate = {
        userId: authUser.id,
        [nameInput]: value,
      };
      if (session) {
        update({ ...session.user, [nameInput]: value });
      }
      await dispatch(updateUser(updateData)).unwrap();
      setStatusUpdate('success');
      setTimeout(() => {
        setStatusUpdate('none');
        setIsInput((prevIsInput) => !prevIsInput);
      }, 1000);
    } catch (rejectedError) {
      const rejectValue = rejectedError as ResponseError;
      setStatusUpdate('error');
      CustomNotification({
        title: rejectValue.code,
        message: rejectValue.message,
        additionalMessage: rejectValue.additionalMessage,
        variant: 'error',
      });
    }
  }, [authUser, value, nameInput, session]);

  const onKeyDownEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleUpdateUser();
    }
  };

  return (
    <>
      <List.Item className={styles.social} icon={icon}>
        {isInput ? (
          <div ref={mergedRef} style={{ width: '100%' }}>
            <Input
              onKeyDown={(e) => onKeyDownEnter(e)}
              data-autofocus
              variant='unstyled'
              className={styles.input}
              placeholder={placeholder}
              value={value}
              onChange={(event) => setValue(event.currentTarget.value)}
              rightSectionPointerEvents='all'
              rightSection={
                <ActionIcon
                  className={styles.save__button}
                  loaderProps={{ color: 'green', width: 24, height: 24 }}
                  loading={statusUser === 'loading'}
                  size={22}
                  variant='default'
                  onClick={handleUpdateUser}
                  aria-label='ActionIcon'
                >
                  {statusUpdate === 'success' ? (
                    <IconCheck style={{ width: rem(22), height: rem(22) }} color={'green'} />
                  ) : statusUpdate === 'error' ? (
                    <IconExclamationCircle style={{ width: rem(22), height: rem(22) }} color={'red'} />
                  ) : (
                    <IconDeviceFloppy style={{ width: rem(22), height: rem(22) }} />
                  )}
                </ActionIcon>
              }
            />
          </div>
        ) : authUser ? (
          <span onClick={handleSetIsInput} className={styles.notif}>
            {authUser?.[nameInput] || '...заполните поле'}
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
