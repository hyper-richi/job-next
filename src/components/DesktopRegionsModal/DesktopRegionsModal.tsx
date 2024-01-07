'use client';

import { IRegion } from '@/app/lib/types';
import { Button, Modal } from '@mantine/core';
import styles from './DesktopRegionsModal.module.scss';
import RegionSelect from '../RegionSelect/RegionSelect';

const DesktopRegionsModal = ({
  showDesktopRegionsModal,
  onCloseDesktopRegionsModal,
  regions,
}: {
  showDesktopRegionsModal: boolean;
  onCloseDesktopRegionsModal: () => void;
  regions?: IRegion[];
}) => {
  return (
    <Modal.Root
      transitionProps={{ transition: 'fade', duration: 200 }}
      centered
      opened={showDesktopRegionsModal}
      onClose={() => onCloseDesktopRegionsModal()}
      className='DesktopRegionsModal'
    >
      <Modal.Overlay />
      <Modal.Content
        styles={{
          content: {
            maxWidth: '550px',
            padding: '60px',
            textAlign: 'end',
            borderRadius: '16px',
          },
        }}
      >
        <Modal.CloseButton className={styles.closebutton} />
        <Modal.Header
          styles={{
            header: {
              justifyContent: 'center',
            },
          }}
        >
          <Modal.Title
            styles={{
              title: {
                color: '#002855',
                fontSize: '36px',
                fontWeight: '500',
                lineHeight: '42px',
                whiteSpace: 'nowrap',
              },
            }}
          >
            Выберите регион
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          styles={{
            body: {
              textAlign: 'center',
              padding: 0,
            },
          }}
        >
          <div className={styles.modal__select}>
            <RegionSelect regions={regions} />
          </div>
          <Button onClick={onCloseDesktopRegionsModal} classNames={styles} variant='filled'>
            Сохранить
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default DesktopRegionsModal;
