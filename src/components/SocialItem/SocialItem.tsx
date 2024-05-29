import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { ActionIcon, Divider, Input, List, rem } from '@mantine/core';
import { IconCheck, IconDeviceFloppy, IconExclamationCircle } from '@tabler/icons-react';
import { useClickOutside, useFocusTrap, useMergedRef } from '@mantine/hooks';
import { DataUserUpdate } from '@/app/lib/store/features/authProfile/types/authProfileSchema';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { selectStatusUser, selectUser, updateUser } from '@/app/lib/store/features/authProfile/slice/authProfileSlice';
import { ResponseError } from '../../..';
import { NameInput } from '@/components/ProfieClient/ProfileClient';
import { Skeleton } from '../Skeleton/Skeleton';
import { useSession } from 'next-auth/react';
import CustomNotification from '../CustomNotification/CustomNotification';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

import styles from './SocialItem.module.scss';
import animationStyles from './animation.module.scss';

interface SocialItemProps {
  icon: ReactNode;
  placeholder: string;
  nameInput: NameInput;
}

const switchAnimation = {
  enter: animationStyles.switchEnter,
  enterActive: animationStyles.switchEnterActive,
  exit: animationStyles.switchExit,
  exitActive: animationStyles.switchExitActive,
};

type StatusUpdateInput = 'none' | 'success' | 'error';

const SocialItem = ({ icon, placeholder, nameInput }: SocialItemProps) => {
  const authProfile = useAppSelector(selectUser);

  const [value, setValue] = useState<string | undefined>(authProfile?.[nameInput]);

  useEffect(() => {
    if (authProfile && authProfile[nameInput]) {
      setValue(authProfile[nameInput]);
    }
  }, [authProfile]);

  const [loading, setLoadingSave] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState<StatusUpdateInput>('none');

  const nodeRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();
  const { data: session, update } = useSession();
  const statusUser = useAppSelector(selectStatusUser);

  const useClickOutsideRef = useClickOutside(() => {
    setLoadingSave(false);
    setIsInput((prevIsInput) => !prevIsInput);
    if (!loading) {
    }
  });

  const myRef = useRef();
  const focusTrapRef = useFocusTrap();
  const mergedRef = useMergedRef(myRef, useClickOutsideRef, focusTrapRef);

  const handleSetIsInput = () => {
    setIsInput((prevIsInput) => !prevIsInput);
    // toggle();
  };

  const handleUpdateUser = useCallback(async () => {
    if (authProfile) {
      try {
        const updateData: DataUserUpdate = {
          userId: authProfile?.id,
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
    }
  }, [authProfile, value, nameInput, session]);

  const onKeyDownEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleUpdateUser();
    }
  };

  return (
    <>
      <List.Item className={styles.social} icon={icon}>
        <SwitchTransition mode={'out-in'}>
          <CSSTransition
            key={isInput ? 'input' : 'span'}
            nodeRef={nodeRef}
            addEndListener={(done: () => void) => {
              nodeRef.current?.addEventListener('transitionend', done, false);
            }}
            classNames={switchAnimation}
          >
            <div ref={nodeRef} className={styles.wrap__animation}>
              {isInput ? (
                <div ref={mergedRef} style={{ width: '100%' }}>
                  <Input
                    id={nameInput}
                    name={nameInput}
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
              ) : authProfile ? (
                <span onClick={handleSetIsInput} className={styles.notif}>
                  {authProfile[nameInput] || '...заполните поле'}
                </span>
              ) : (
                <Skeleton minWidth={'100%'} height={'28px'} />
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </List.Item>
      <Divider />
    </>
  );
};

export default React.memo(SocialItem);
