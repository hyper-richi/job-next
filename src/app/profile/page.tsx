'use client';

import { Avatar, Card, Divider, Grid, List, ThemeIcon, rem } from '@mantine/core';
import { useSession } from 'next-auth/react';
import { IconBrandGithubFilled, IconBrandInstagram, IconBrandTwitterFilled, IconWorld } from '@tabler/icons-react';
import { useAppSelector } from '@/app/lib/store/hooks';
import { selectUser } from '../lib/store/features/user/slice/userSlice';
import styles from './page.module.scss';
import SocialItem from '@/components/SocialItem/SocialItem';
import { ReactNode } from 'react';

export type NameInput = 'website' | 'github' | 'twitter' | 'instagram';

interface SocialList {
  icon: ReactNode;
  placeholder: string;
  nameInput: NameInput;
}

const SOCIAL_LIST: SocialList[] = [
  {
    icon: (
      <ThemeIcon color='#fff' size={24} radius='xl'>
        <IconWorld style={{ width: rem(26), height: rem(26) }} color='#e4a11b' />
      </ThemeIcon>
    ),
    placeholder: 'www.website.com',
    nameInput: 'website',
  },
  {
    icon: (
      <ThemeIcon color='#333333' size={24} radius='xl'>
        <IconBrandGithubFilled style={{ width: rem(20), height: rem(20) }} color='#fff' />
      </ThemeIcon>
    ),
    placeholder: 'github',
    nameInput: 'github',
  },
  {
    icon: (
      <ThemeIcon color='#fff' size={24} radius='xl'>
        <IconBrandTwitterFilled style={{ width: rem(20), height: rem(20), color: '#55acee' }} />
      </ThemeIcon>
    ),
    placeholder: 'twitter',
    nameInput: 'twitter',
  },
  {
    icon: (
      <ThemeIcon color='#fff' size={24} radius='xl'>
        <IconBrandInstagram style={{ width: rem(22), height: rem(22), color: '#ac2bac' }} />
      </ThemeIcon>
    ),
    placeholder: 'instagram',
    nameInput: 'instagram',
  },
];

const Profile = () => {
  const { data: session } = useSession();
  console.log('session: ', session);

  const authUserSelect = useAppSelector(selectUser);

  const authUser = session?.user || authUserSelect;

  return authUser ? (
    <section className={styles.container}>
      <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }} style={{ width: '100%' }}>
        <Grid.Col span={4}>
          <Card shadow='sm' padding='lg' radius='md' withBorder>
            <Card.Section className={styles.card__header}>
              <Avatar size='md' radius='xl' className={styles.avatar} src={session?.user.avatar.url} alt='profile picture' />
              <h5 className={styles.card__title}>{session?.user?.username}</h5>
              <p className={styles.card__email}>{session?.user.email}</p>
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
                <p className={styles.text}>{session?.user.username}</p>
              </div>
            </div>
            <Divider my='md' />
            <div className={styles.row}>
              <div className={styles['col-sm-3']}>
                <p className={styles.text}>Email</p>
              </div>
              <div className={styles['col-sm-9']}>
                <p className={styles.text}>{session?.user.email}</p>
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
                  <SocialItem
                    key={item.placeholder}
                    nameInput={item.nameInput}
                    icon={item.icon}
                    placeholder={item.placeholder}
                    authUser={authUser}
                  />
                ))}
              </List>
            </Card.Section>
          </Card>
        </Grid.Col>
      </Grid>
      {/* <Paper shadow='xl' p='xl'>
        <Card shadow='sm' padding='lg' radius='md' withBorder>
          <Card.Section className={styles.card__header}>
            <Avatar size='md' radius='xl' className={styles.avatar} src={session?.user.avatar.url} alt='profile picture' />
            <h5 className={styles.card__title}>{session?.user.username}</h5>
            <p className={styles.card__email}>{session?.user.email}</p>
          </Card.Section>
        </Card>
      </Paper> */}

      {/* <form action={logout} className='h-screen w-screen flex flex-col justify-center items-center gap-10'>
        <div>
          <p className='text-white'>{session?.user?.username}</p>
          <p className='text-white'>{session?.user?.email}</p>
          <p className='text-white'>{session?.user?.id}</p>
        </div>
        <button type='submit' className='w-40'>
          logout
        </button>
      </form> */}
    </section>
  ) : (
    <div>No Data</div>
  );
};

export default Profile;
