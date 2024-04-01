import { forwardRef } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import { Group, Avatar, Text, UnstyledButton } from '@mantine/core';
import styles from './AvatarButton.module.scss';

interface AvatarButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image?: string;
  name?: string;
  email?: string;
  icon?: React.ReactNode;
}

const AvatarButton = forwardRef<HTMLButtonElement, AvatarButtonProps>(
  ({ image, name, email, icon, ...others }: AvatarButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        padding: 'var(--mantine-spacing-md)',
        color: 'var(--mantine-color-text)',
        borderRadius: 'var(--mantine-radius-sm)',
      }}
      {...others}
    >
      <Group wrap='nowrap' className={styles.group}>
        <Avatar size='md' radius='xl' className={styles.avatar__picture} src={image} alt='profile picture' />
        <div style={{ flex: 1 }}>
          <Text size='sm' fw={500} className={styles.avatar__name}>
            {name}
          </Text>

          <Text c='dimmed' size='xs' className={styles.avatar__email}>
            {email}
          </Text>
        </div>

        {image && <IconChevronRight size='1rem' className={styles.avatar__icon} />}
      </Group>
    </UnstyledButton>
  )
);

export default AvatarButton;
