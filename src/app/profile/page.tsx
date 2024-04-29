'use client';

import { auth } from '@/auth';
// import { logout } from '@/lib/actions';
import { Avatar, Badge, Button, Card, Divider, Grid, Group, Paper, Text } from '@mantine/core';
import styles from './page.module.scss';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const Profile = () => {
  const { data: session } = useSession();

  return (
    <section className={styles.container}>
      <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }} style={{ width: '100%' }}>
        <Grid.Col span={4}>
          {/*   <Paper shadow='xl' p='xl'> */}
          <Card shadow='sm' padding='lg' radius='md' withBorder>
            <Card.Section className={styles.card__header}>
              {/*  <Image src={session?.user.avatar.url} width={160} height={160} alt='Norway' /> */}
              <Avatar size='md' radius='xl' className={styles.avatar} src={session?.user.avatar.url} alt='profile picture' />
              <h5 className={styles.card__title}>{session?.user.username}</h5>
              <p className={styles.card__email}>{session?.user.email}</p>
            </Card.Section>
          </Card>
          {/*   </Paper> */}
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
        {/*  <Grid.Col span={4}>3</Grid.Col> */}
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
  );
};

export default Profile;
