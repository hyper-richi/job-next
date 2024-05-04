'use client';
import React, { ReactNode, useLayoutEffect } from 'react';
import { Avatar, Card, Divider, Grid, List, ThemeIcon, rem } from '@mantine/core';
import { IconBrandGithubFilled, IconBrandInstagram, IconBrandTwitterFilled, IconWorld } from '@tabler/icons-react';
import SocialItem from '@/components/SocialItem/SocialItem';
import { useSession } from 'next-auth/react';
import { Skeleton } from '../Skeleton/Skeleton';
import styles from './ProfileClient.module.scss';
interface SocialList {
  icon: ReactNode;
  placeholder: string;
  nameInput: NameInput;
}
export type NameInput = 'website' | 'github' | 'twitter' | 'instagram';

const SOCIAL_LIST: SocialList[] = [
  {
    icon: (
      <ThemeIcon color='#fff' radius='xl'>
        <IconWorld viewBox='2 2 20 20' size={28} color='#e4a11b' />
      </ThemeIcon>
    ),
    placeholder: 'www.website.com',
    nameInput: 'website',
  },
  {
    icon: (
      <ThemeIcon color='#333333' size={28} radius='xl'>
        <IconBrandGithubFilled viewBox='2 2 20 20' style={{ width: rem(20), height: rem(20) }} color='#fff' />
      </ThemeIcon>
    ),
    placeholder: 'github',
    nameInput: 'github',
  },
  {
    icon: (
      <ThemeIcon color='#fff' radius='xl'>
        <IconBrandTwitterFilled viewBox='2 2 20 20' size={28} style={{ color: '#55acee' }} />
      </ThemeIcon>
    ),
    placeholder: 'twitter',
    nameInput: 'twitter',
  },
  {
    icon: (
      <ThemeIcon color='#fff' radius='xl'>
        <IconBrandInstagram viewBox='2 2 20 20' size={28} style={{ color: '#ac2bac' }} />
      </ThemeIcon>
    ),
    placeholder: 'instagram',
    nameInput: 'instagram',
  },
];

const ProfileClient = () => {
  console.log('ProfileClient: ');
  const { data: session } = useSession();
  const userSession = session?.user;

  return (
    <section className={styles.container}>
      <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }} style={{ width: '100%' }}>
        <Grid.Col span={4}>
          <Card shadow='sm' padding='lg' radius='md' withBorder>
            <Card.Section className={styles.card__header}>
              {userSession ? (
                <Avatar size='md' radius={'8px'} className={styles.avatar} src={userSession.avatar.url} alt='profile picture' />
              ) : (
                <Skeleton minWidth={'150px'} height={'180px'} borderRadius='8px' paddingTop={'0'} />
              )}
              {userSession ? (
                <h5 className={styles.card__title}>{userSession?.username}</h5>
              ) : (
                <Skeleton minWidth={'100%'} height={'24px'} margin={'16px 0'} />
              )}
              {userSession ? (
                <p className={styles.card__email}>{userSession?.email}</p>
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
                {userSession ? <p className={styles.text}>{userSession?.username}</p> : <Skeleton minWidth={'100%'} height={'24px'} />}
              </div>
            </div>
            <Divider my='md' />
            <div className={styles.row}>
              <div className={styles['col-sm-3']}>
                <p className={styles.text}>Email</p>
              </div>
              <div className={styles['col-sm-9']}>
                {userSession ? <p className={styles.text}>{userSession?.email}</p> : <Skeleton minWidth={'100%'} height={'24px'} />}
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
                {SOCIAL_LIST.map((item) => (
                  <SocialItem key={item.placeholder} nameInput={item.nameInput} icon={item.icon} placeholder={item.placeholder} />
                ))}
              </List>
            </Card.Section>
          </Card>
        </Grid.Col>
      </Grid>
    </section>
  );
};

export default React.memo(ProfileClient);
