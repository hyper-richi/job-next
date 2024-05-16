'use client';

import { Button } from '@mantine/core';
import styles from './DesktopRegionsModal.module.scss';
import RegionSelect from '../../RegionSelect/RegionSelect';
import { IRegion } from '../../../..';

const DesktopRegionsModal = ({ onClose, regions }: { onClose: () => void; regions?: IRegion[] }) => {
  return (
    <div className={styles.modal__container}>
      <h2 className={styles.modal__title}>Выберите регион</h2>
      <div className={styles.modal__select}>
        <RegionSelect regions={regions} />
      </div>
      <Button onClick={onClose} classNames={styles} variant='filled'>
        Сохранить
      </Button>
    </div>
  );
};

export default DesktopRegionsModal;
