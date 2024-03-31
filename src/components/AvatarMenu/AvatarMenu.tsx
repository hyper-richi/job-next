'use client';

import { useAppSelector } from '@/app/lib/store/hooks';
import { Menu, rem, Avatar } from '@mantine/core';
import { IconSettings, IconPhoto, IconMessageCircle, IconTrash, IconLogin2 } from '@tabler/icons-react';
import styles from './AvatarMenu.module.scss';

function AvatarMenu({ open }: { open: () => void }) {
  const { status, authUser } = useAppSelector((state) => state.authUser);

  return (
    <div className={styles.avatar}>
      <Menu shadow='md' width={200}>
        <Menu.Target>
          {status === 'loading' ? (
            '...'
          ) : (
            <Avatar size='md' className={styles.avatar__picture} src={authUser?.avatar?.url} alt='profile picture' />
          )}
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item disabled leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
            Settings
          </Menu.Item>
          <Menu.Item disabled leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
            Messages
          </Menu.Item>
          <Menu.Item disabled leftSection={<IconPhoto style={{ width: rem(14), height: rem(14) }} />}>
            Gallery
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item onClick={open} leftSection={<IconLogin2 style={{ width: rem(14), height: rem(14) }} />}>
            Зайти
          </Menu.Item>
          <Menu.Item color='red' leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}>
            Delete my account
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}

export default AvatarMenu;
