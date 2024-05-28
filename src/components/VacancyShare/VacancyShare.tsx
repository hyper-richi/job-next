'use client';
import React, { ReactElement, useCallback, useState } from 'react';
import styles from './VacancyShare.module.scss';
import clsx from 'clsx';
import { Tooltip } from '@mantine/core';
import ShareIcon from '../../../public/images/svg/shareIcon.svg';

interface VacancyShareProps {
  textURL: string;
}

const VacancyShare = ({ textURL }: VacancyShareProps) => {
  const [show, setShow] = useState(false);
  const handleClick = useCallback(() => {
    navigator.clipboard.writeText(textURL);
    setShow((show) => !show);
    setTimeout(() => {
      setShow((show) => !show);
    }, 1000);
  }, [textURL]);

  function label(): ReactElement {
    return (
      <div className={clsx(styles.tooltip)}>
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M19.759 6.427a1 1 0 00-.372 1.364A8.455 8.455 0 0120.5 12 8.5 8.5 0 1112 3.5c1.503 0 2.947.39 4.22 1.12a1 1 0 10.995-1.735A10.455 10.455 0 0012 1.5C6.201 1.5 1.5 6.201 1.5 12S6.201 22.5 12 22.5 22.5 17.799 22.5 12c0-1.848-.48-3.63-1.377-5.201a1 1 0 00-1.364-.372zM11 13.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a.996.996 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L11 13.586z'
            fill='#06CA99'
          ></path>
        </svg>
        Ссылка успешно скопирована!
      </div>
    );
  }
  return (
    <>
      <Tooltip
        opened={show}
        withinPortal={false}
        events={{ hover: false, focus: false, touch: true }}
        label={label()}
        closeDelay={500}
        transitionProps={{ transition: 'slide-down', duration: 300 }}
      >
        <div onClick={handleClick} className={styles.share}>
          <ShareIcon />
          <span>Поделиться вакансией</span>
        </div>
      </Tooltip>
    </>
  );
};

export default VacancyShare;
