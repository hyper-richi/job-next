'use client';

import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { Menu, rem } from '@mantine/core';
import { IconSettings, IconPhoto, IconMessageCircle, IconTrash, IconLogin2, IconLogout2, IconUserCircle } from '@tabler/icons-react';
import styles from './AvatarMenu.module.scss';
import AvatarButton from '../AvatarButton/AvatarButton';
import { deleteUser } from '@/app/lib/store/features/user/slice/userSlice';
// import { clearFavorites } from '@/app/lib/store/features/favorites/slice/favoritesSlice';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

function AvatarMenu({ openSignModal }: { openSignModal: () => void }) {
  // const { authUser } = useAppSelector((state) => state.authUser);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    // dispatch(logoutUser());
    // dispatch(clearFavorites());
    const authData = await signOut();

    // router.push('/');
  };

  return (
    <div className={styles.AvatarMenu}>
      <Menu shadow='md' width={200} withArrow trigger='hover' openDelay={100} closeDelay={400}>
        <Menu.Target>
          <AvatarButton imageSrc={session?.user?.avatar.url} name={session?.user.username} email={session?.user.email} />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item
            className={styles.menu__item}
            leftSection={<IconUserCircle style={{ width: rem(14), height: rem(14) }} />}
            component='a'
            href='/profile'
          >
            <span className={styles.menu__label}>Profile</span>
          </Menu.Item>
          <Menu.Item
            className={styles.menu__item}
            disabled
            leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}
          >
            <span className={styles.menu__label}>Messages</span>
          </Menu.Item>
          <Menu.Item className={styles.menu__item} disabled leftSection={<IconPhoto style={{ width: rem(14), height: rem(14) }} />}>
            <span className={styles.menu__label}>Gallery</span>
          </Menu.Item>
          <Menu.Divider />
          {session?.user ? (
            <Menu.Item
              className={styles.menu__item}
              leftSection={<IconLogout2 style={{ width: rem(14), height: rem(14) }} />}
              onClick={handleLogout}
            >
              <span className={styles.menu__label}>Выйти</span>
            </Menu.Item>
          ) : (
            <Menu.Item
              className={styles.menu__item}
              onClick={openSignModal}
              leftSection={<IconLogin2 style={{ width: rem(14), height: rem(14) }} />}
            >
              <span className={styles.menu__label}>Войти</span>
            </Menu.Item>
          )}
          {session?.user && (
            <Menu.Item
              onClick={() => dispatch(deleteUser(session?.user?.id))}
              className={styles.menu__item}
              color='red'
              leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
            >
              <span className={styles.menu__label}>Удалить акаунт</span>
            </Menu.Item>
          )}
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}

export default AvatarMenu;
