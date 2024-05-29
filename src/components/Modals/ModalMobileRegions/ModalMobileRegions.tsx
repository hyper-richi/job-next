'use client';

import React, { useMemo } from 'react';
import clsx from 'clsx';
import { Modal } from '@mantine/core';
import SelectedIcon from '../../../../public/images/svg/selectedIcon.svg';
import ArrowLeftIcon from '../../../../public/images/svg/arrowLeftIcon.svg';
import styles from './ModalMobileRegions.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';
import { IRegion } from '../../../..';

const MobileRegionsModal = ({
  showMobileRegionsModal,
  onCloseMobileRegionsModal,
  regions,
}: {
  showMobileRegionsModal: boolean;
  onCloseMobileRegionsModal: () => void;
  regions?: IRegion[];
}) => {
  const searchParams = useSearchParams();
  const regionCodeParams = searchParams.get('regionCode') || '';

  const { replace } = useRouter();

  const SearchParams = new URLSearchParams(searchParams);

  const arrRegions = useMemo(() => {
    return regions?.map((item) => {
      return { value: item.code, label: item.name };
    });
  }, [regions]);

  function onChangeRegion(regionCode: string) {
    SearchParams.set('regionCode', regionCode);
    replace(`?${SearchParams.toString()}`);
    localStorage.setItem('regionCode', regionCode);
    onCloseMobileRegionsModal();
  }

  return (
    <Modal.Root
      className='MobileRegionsModal'
      fullScreen
      radius={0}
      transitionProps={{ transition: 'fade', duration: 200 }}
      opened={showMobileRegionsModal}
      onClose={() => onCloseMobileRegionsModal()}
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <ArrowLeftIcon style={{ cursor: 'pointer' }} onClick={() => onCloseMobileRegionsModal()} />
          <Modal.Title className={styles.title}>Выберите регион </Modal.Title>
          <Modal.CloseButton className={styles.closebutton} />
        </Modal.Header>
        <Modal.Body className={styles.body}>
          <div className={styles.cities__list}>
            {arrRegions?.map((item) => (
              <div
                key={item.value}
                className={clsx(styles.cities__item, regionCodeParams === item.value && styles['cities__item--active'])}
                onClick={() => onChangeRegion(item.value)}
              >
                {item.label}
                {regionCodeParams === item.value && <SelectedIcon />}
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default MobileRegionsModal;
