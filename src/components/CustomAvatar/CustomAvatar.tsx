import { Avatar, Group } from '@mantine/core';
import styles from './CustomAvatar.module.scss';
import clsx from 'clsx';
import { Mods } from '../../..';
import { Skeleton } from '../Skeleton/Skeleton';
import { useEffect, useState } from 'react';

interface Props {
  src: string | undefined;
  spinner: boolean;
}

const CustomAvatar = (props: Props) => {
  const { src, spinner } = props;

  const [url, setUrl] = useState<string | undefined>();
  console.log('url: ', url);

  useEffect(() => {
    if (src) {
      fetch(src)
        .then((response) => {
          return response.blob();
        })
        .then((image) => {
          setUrl(URL.createObjectURL(image));
          console.log('setUrl: ');
        })
        .catch((err) => console.log(err));
    }
  }, [src]);

  const modsIcon: Mods = {
    [styles.avatar]: spinner,
  };

  return (
    <Group justify='center'>
      {url ? (
        <Avatar className={clsx(styles.root, modsIcon)} m='sm' size='lg' src={url} alt='profile picture' />
      ) : (
        <div className={styles.skeleton}>
          <Skeleton borderRadius={'50%'} width={76} height={76} />
        </div>
      )}
    </Group>
  );
};

export default CustomAvatar;
