'use client';
import { useEffect, useMemo } from 'react';
import styles from './RegionName.module.scss';
import { IRegion } from '@/app/lib/types';
import { useRouter, useSearchParams } from 'next/navigation';

const RegionName = ({ regions }: { regions?: IRegion[] }) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const SearchParams = new URLSearchParams(searchParams);
  const regionCodeParams = searchParams.get('regionCode') || '';

  useEffect(() => {
    const regionCodeStorage = localStorage.getItem('regionCode') || '';

    if (!regionCodeParams && !regionCodeStorage) {
      localStorage.setItem('regionCode', 'all');
      SearchParams.set('regionCode', 'all');
      replace(`?${SearchParams.toString()}`);
    }

    if (regionCodeStorage) {
      SearchParams.set('regionCode', regionCodeStorage);
      replace(`?${SearchParams.toString()}`);
    }
  }, []);

  const regionName = useMemo(() => {
    if (regions) {
      return regions?.find((item) => item.code === regionCodeParams)?.name || 'Россия';
    } else return 'Россия';
  }, [regions, regionCodeParams]);

  return <span className={styles['city-name']}>{regionName}</span>;
};

export default RegionName;
