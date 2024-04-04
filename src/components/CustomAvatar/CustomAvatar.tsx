import { Avatar, Group } from '@mantine/core';
import styles from './CustomAvatar.module.scss';
import clsx from 'clsx';
import { Mods } from '../../..';
import { Skeleton } from '../Skeleton/Skeleton';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/app/lib/store/hooks';
import { selectStatusUploadFile } from '@/app/lib/store/features/file/slice/fileSlice';
import CustomNotification from '../CustomNotification/CustomNotification';

interface Props {
  src: string | undefined;
  spinner: boolean;
}

const CustomAvatar = (props: Props) => {
  const { src, spinner } = props;
  const [loadingUrl, setLoadingUrl] = useState(false);
  const statusUploadFile = useAppSelector(selectStatusUploadFile);
  const isLoading = statusUploadFile === 'loading';
  const [url, setUrl] = useState<string | undefined>();

  useEffect(() => {
    if (src) {
      setLoadingUrl(true);
      fetch(src)
        .then((response) => {
          return response.blob();
        })
        .then((image) => {
          setUrl(URL.createObjectURL(image));
          console.log('setUrl: ');
          setLoadingUrl(false);
          CustomNotification({
            title: 'Аватар',
            message: 'Фотография аватара успешно добавлена!',
            variant: 'succes',
          });
        })
        .catch((err) => console.log(err));
    }
  }, [src]);

  const modsIcon: Mods = {
    [styles.avatar]: spinner,
  };


  if (isLoading || loadingUrl) {
    return (
      <Group justify='center'>
        <div className={styles.skeleton}>
          <Skeleton borderRadius={'50%'} width={76} height={76} />
        </div>
      </Group>
    );
  }

 
  return (
    <Group justify='center'>
      <Avatar className={clsx(styles.root, modsIcon)} m='sm' size='lg' src={url} alt='profile picture' />
    </Group>
  );
};

export default CustomAvatar;
