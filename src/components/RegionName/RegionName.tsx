'use client';
import { useEffect, useMemo } from 'react';
import styles from './RegionName.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';
import { IRegion } from '../../..';

const RegionName = ({ regions }: { regions?: IRegion[] }) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const SearchParams = new URLSearchParams(searchParams);
  const regionCodeParams = searchParams.get('regionCode') || '';

  useEffect(() => {
    const regionCodeStorage = localStorage.getItem('regionCode') || '';

    /*  if (!regionCodeParams && !regionCodeStorage) {
      localStorage.setItem('regionCode', 'all');
      SearchParams.set('regionCode', 'all');
      replace(`?${SearchParams.toString()}`);
    } */

    /* if (regionCodeStorage && !regionCodeParams) {
      SearchParams.set('regionCode', regionCodeStorage);
      replace(`?${SearchParams.toString()}`);
    } */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const regionName = useMemo(() => {
    if (regions) {
      return regions?.find((item) => item.code === regionCodeParams)?.name || 'Россия';
    } else return 'Россия';
  }, [regions, regionCodeParams]);

  return <span className={styles['city-name']}>{regionName}</span>;
};

export default RegionName;
