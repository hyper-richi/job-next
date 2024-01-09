'use client';
 import { CategoryVacancy, Mods } from '@/app/lib/types';
import styles from './NavbarItem.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import SpinnerIcon from '../../../public/images/svg/spinnerIcon.svg';

const NavbarItem = ({ categoryVacancy, isMobile }: { categoryVacancy: CategoryVacancy; isMobile?: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { jobCategory } = useParams();
  const pathname = usePathname();

  const encodeSearchText = encodeURIComponent(useSearchParams().get('text') || '');

  const [regionCodeStorage, setRegionCodeStorage] = useState('');

  useEffect(() => {
    const regionCodeStorage = localStorage.getItem('regionCode') || 'all';
    setRegionCodeStorage(regionCodeStorage);
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  let url = '';

  if (categoryVacancy.jobCategory === '/vacancies') {
    url = `${categoryVacancy.jobCategory}?offset=0`;
  } else {
    url = `/vacancies/${categoryVacancy.jobCategory}?offset=0`;
  }

  if (regionCodeStorage) {
    url = url + `&regionCode=${regionCodeStorage}`;
  }

  if (encodeSearchText) {
    url = url + `&text=${encodeSearchText}`;
  }

  const handleCklick = () => {
    setIsLoading(true);
  };

  const modsIcon: Mods = {
    [styles.navbar__icon__isMobile]: !isMobile,
    [styles.navbar__icon]: isMobile,
  };

  const modsLink: Mods = {
    [styles['navbar__links--active']]: jobCategory === categoryVacancy.jobCategory || pathname === categoryVacancy.jobCategory,
  };

  return (
    <Link key={categoryVacancy.jobCategory} className={clsx(styles.navbar__links, modsLink)} href={url} onClick={handleCklick}>
      <div className={clsx(isMobile ? styles.navbar__name__mobile : styles.navbar__name)}>
        {categoryVacancy.icon}
        <span className={styles['links-name']}>{categoryVacancy.name}</span>
      </div>
      {isLoading && <SpinnerIcon className={clsx(modsIcon)} width='24' height='24' />}
    </Link>
  );
};

export default NavbarItem;
