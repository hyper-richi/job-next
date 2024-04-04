import { Avatar, Group } from '@mantine/core';
import styles from './CustomAvatar.module.scss';
import clsx from 'clsx';
import { Skeleton } from '../Skeleton/Skeleton';
import { useAppSelector } from '@/app/lib/store/hooks';
import { selectStatusUploadFile, selectUploadUrlImg } from '@/app/lib/store/features/file/slice/fileSlice';



const CustomAvatar = () => {
  const statusUploadFile = useAppSelector(selectStatusUploadFile);
  const url = useAppSelector(selectUploadUrlImg);
  const isLoading = statusUploadFile === 'loading';

  if (isLoading) {
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
      <Avatar className={clsx(styles.root)} m='sm' size='lg' src={url} alt='profile picture' />
    </Group>
  );
};

export default CustomAvatar;
