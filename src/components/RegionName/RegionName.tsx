'use client';
import { useMemo } from 'react';
import styles from './RegionName.module.scss';
import {  useSearchParams } from 'next/navigation';
import { IRegion } from '../../..';

const RegionName = ({ regions }: { regions?: IRegion[] }) => {
  const searchParams = useSearchParams();
  const regionCodeParams = searchParams.get('regionCode') || '';

    const regionName = useMemo(() => {
    if (regions) {
      return regions?.find((item) => item.code === regionCodeParams)?.name || 'Россия';
    } else return 'Россия';
  }, [regions, regionCodeParams]);

  return <span className={styles['city-name']}>{regionName}</span>;
};

export default RegionName;
