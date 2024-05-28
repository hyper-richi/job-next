'use client';
import React, { ReactNode } from 'react';
import { Card, Divider, Grid, List, ThemeIcon, rem } from '@mantine/core';
import { IconBrandGithubFilled, IconBrandInstagram, IconBrandTwitterFilled, IconWorld } from '@tabler/icons-react';
import styles from './ProfileClient.module.scss';
import SocialItem from '@/components/SocialItem/SocialItem';
import { Skeleton } from '../Skeleton/Skeleton';

interface SocialList {
  icon: ReactNode;
  placeholder: string;
  nameInput: NameInput;
}
export type NameInput = 'website' | 'github' | 'twitter' | 'instagram';

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

const ProfileClientSkeleton = () => {
  return (
    <section className={styles.container}>
      <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }} style={{ width: '100%' }}>
        <Grid.Col span={4}>
          <Card shadow='sm' padding='lg' radius='md' withBorder>
            <Card.Section className={styles.card__header}>
              <Skeleton minWidth={'150px'} height={'180px'} borderRadius='8px' paddingTop={'0'} />
              <Skeleton minWidth={'100%'} height={'24px'} margin={'16px 0'} />
              <Skeleton minWidth={'100%'} height={'24px'} margin={'0 0 4px'} />
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
                <Skeleton minWidth={'100%'} height={'24px'} />
              </div>
            </div>
            <Divider my='md' />
            <div className={styles.row}>
              <div className={styles['col-sm-3']}>
                <p className={styles.text}>Email</p>
              </div>
              <div className={styles['col-sm-9']}>
                <Skeleton minWidth={'100%'} height={'24px'} />
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
                  />
                ))}
              </List>
            </Card.Section>
          </Card>
        </Grid.Col>
      </Grid>
    </section>
  );
};

export default React.memo(ProfileClientSkeleton);
