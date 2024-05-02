'use client';
import React, { ReactNode, RefCallback, RefObject, createRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Avatar, Card, Divider, Grid, List, ThemeIcon, rem } from '@mantine/core';
import { IconBrandGithubFilled, IconBrandInstagram, IconBrandTwitterFilled, IconWorld } from '@tabler/icons-react';
import styles from './ProfileClient.module.scss';
import SocialItem from '@/components/SocialItem/SocialItem';
import { useSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { selectUser, setAuthUser } from '@/app/lib/store/features/user/slice/userSlice';
import { Skeleton } from '../Skeleton/Skeleton';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import animationStyles from './animation.module.scss';
interface SocialList {
  icon: ReactNode;
  placeholder: string;
  nameInput: NameInput;
  nodeRef: RefObject<HTMLLIElement>;
}
export type NameInput = 'website' | 'github' | 'twitter' | 'instagram';

const itemAnimation = {
  enter: animationStyles.itemEnter,
  enterActive: animationStyles.itemEnterActive,
  exit: animationStyles.itemDelete,
  exitActive: animationStyles.itemDeleteActive,
};

const SOCIAL_LIST: SocialList[] = [
  {
    icon: (
      <ThemeIcon color='#fff' size={24} radius='xl'>
        <IconWorld style={{ width: rem(26), height: rem(26) }} color='#e4a11b' />
      </ThemeIcon>
    ),
    placeholder: 'www.website.com',
    nameInput: 'website',
    nodeRef: createRef(),
  },
  {
    icon: (
      <ThemeIcon color='#333333' size={24} radius='xl'>
        <IconBrandGithubFilled style={{ width: rem(20), height: rem(20) }} color='#fff' />
      </ThemeIcon>
    ),
    placeholder: 'github',
    nameInput: 'github',
    nodeRef: createRef(),
  },
  {
    icon: (
      <ThemeIcon color='#fff' size={24} radius='xl'>
        <IconBrandTwitterFilled style={{ width: rem(20), height: rem(20), color: '#55acee' }} />
      </ThemeIcon>
    ),
    placeholder: 'twitter',
    nameInput: 'twitter',
    nodeRef: createRef(),
  },
  {
    icon: (
      <ThemeIcon color='#fff' size={24} radius='xl'>
        <IconBrandInstagram style={{ width: rem(22), height: rem(22), color: '#ac2bac' }} />
      </ThemeIcon>
    ),
    placeholder: 'instagram',
    nameInput: 'instagram',
    nodeRef: createRef(),
  },
];

const ProfileClient = () => {
  console.log('ProfileClient: ');
  const { data: session, update } = useSession();
  const dispatch = useAppDispatch();
  const authUserSelect = useAppSelector(selectUser);
  const nodeRef = useRef(null);

  useLayoutEffect(() => {
    /*  console.log('authUserSelect: ', authUserSelect);
    console.log('session: ', session); */
    if (session) {
      dispatch(setAuthUser(session?.user));
    }
  }, []);

  const authUser = authUserSelect; // session?.user; // authUserSelect;
  console.log('authUserSelect: ', authUserSelect);
  /*
  if (!authUserSelect) {
    return <ProfileClientSkeleton />;
  } */
  return (
    <section className={styles.container}>
      <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }} style={{ width: '100%' }}>
        <Grid.Col span={4}>
          <Card shadow='sm' padding='lg' radius='md' withBorder>
            <Card.Section className={styles.card__header}>
              {authUser ? (
                <Avatar size='md' radius={'8px'} className={styles.avatar} src={authUser.avatar.url} alt='profile picture' />
              ) : (
                <Skeleton minWidth={'150px'} height={'180px'} borderRadius='8px' paddingTop={'0'} />
              )}
              {authUser ? (
                <h5 className={styles.card__title}>{authUser?.username}</h5>
              ) : (
                <Skeleton minWidth={'100%'} height={'24px'} margin={'16px 0'} />
              )}
              {authUser ? (
                <p className={styles.card__email}>{authUser?.email}</p>
              ) : (
                <Skeleton minWidth={'100%'} height={'24px'} margin={'0 0 4px'} />
              )}
            </Card.Section>
          </Card>
        </Grid.Col>
        <Grid.Col span={'auto'}>
          <Card shadow='sm' padding='lg' radius='md' withBorder style={{ color: '#757575' }}>
            <div className={styles.row}>
              <div className={styles['col-sm-3']}>
                <p className={styles.text}>Full Name</p>
              </div>
              <div className={styles['col-sm-9']}>
                {authUser ? <p className={styles.text}>{authUser?.username}</p> : <Skeleton minWidth={'100%'} height={'24px'} />}
              </div>
            </div>
            <Divider my='md' />
            <div className={styles.row}>
              <div className={styles['col-sm-3']}>
                <p className={styles.text}>Email</p>
              </div>
              <div className={styles['col-sm-9']}>
                {authUser ? <p className={styles.text}>{authUser?.email}</p> : <Skeleton minWidth={'100%'} height={'24px'} />}
              </div>
            </div>
          </Card>
        </Grid.Col>
      </Grid>
      <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }} style={{ width: '100%' }}>
        <Grid.Col span={4}>
          <Card shadow='sm' padding='lg' radius='md' withBorder>
            <Card.Section>
              <List spacing='xs' size='sm' center>
                {/*    <TransitionGroup className={styles.content}> */}
                {SOCIAL_LIST.map(
                  (item) =>
                    /*  <CSSTransition key={item.placeholder} nodeRef={item.nodeRef} timeout={300} classNames={itemAnimation}> */
                    authUser ? (
                      <SocialItem
                        key={item.placeholder}
                        nameInput={item.nameInput}
                        icon={item.icon}
                        placeholder={item.placeholder}
                        authUser={authUser}
                      />
                    ) : null
                  /*   </CSSTransition> */
                )}
                {/*      </TransitionGroup> */}
              </List>
            </Card.Section>
          </Card>
        </Grid.Col>
      </Grid>
    </section>
  );
};

export default React.memo(ProfileClient);
