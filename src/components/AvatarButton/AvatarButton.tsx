import { forwardRef } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import { Group, Avatar, Text, UnstyledButton } from '@mantine/core';
import styles from './AvatarButton.module.scss';

interface AvatarButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  imageSrc?: string;
  name?: string;
  email?: string;
  icon?: React.ReactNode;
}

const AvatarButton = forwardRef<HTMLButtonElement, AvatarButtonProps>(
  ({ imageSrc, name, email, icon, ...others }: AvatarButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        padding: 0,
        color: 'var(--mantine-color-text)',
        borderRadius: 'var(--mantine-radius-sm)',
        height: '100%',
      }}
      {...others}
    >
      <Group wrap='nowrap' className={styles.group}>
        <Avatar size='md' radius='xl' className={styles.avatar__picture} src={imageSrc} alt='profile picture' />
        {imageSrc && (
          <div style={{ flex: 1 }}>
            <Text size='sm' fw={500} className={styles.avatar__name}>
              {name}
            </Text>
            <Text c='dimmed' size='xs' className={styles.avatar__email}>
              {email}
            </Text>
          </div>
        )}
        {imageSrc && <IconChevronRight size='1rem' className={styles.avatar__icon} />}
      </Group>
    </UnstyledButton>
  )
);

export default AvatarButton;
