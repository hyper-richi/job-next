'use client';
import { useEffect, useMemo, useState } from 'react';
import styles from './RegionName.module.scss';
import { IRegion } from '@/app/lib/types';

const RegionName = ({ regions }: { regions?: IRegion[] }) => {
  const [regionCodeStorage, setRegionCodeStorage] = useState('');

  useEffect(() => {
    const regionCodeStorage = localStorage.getItem('regionCode') || '';
    setRegionCodeStorage(regionCodeStorage);
  }, []);

  useEffect(() => {
    if (!regionCodeStorage) {
      localStorage.setItem('regionCode', 'all');
    }
  }, []);

  const regionName = useMemo(() => {
    if (regions) {
      return regions?.find((item) => item.code === regionCodeStorage)?.name || 'Россия';
    } else return 'Россия';
  }, [regions, regionCodeStorage]);

  return <span className={styles['city-name']}>{regionName}</span>;
};

export default RegionName;
