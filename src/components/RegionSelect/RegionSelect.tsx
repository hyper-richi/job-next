'use client';
import React, { useMemo, useState } from 'react';
import styles from './RegionSelect.module.scss';
import { Select } from '@mantine/core';
import { IRegion } from '@/app/lib/types';
import { useRouter, useSearchParams } from 'next/navigation';

const RegionSelect = ({ regions }: { regions?: IRegion[] }) => {
  const [searchValue, setSearchValue] = useState('');

  const searchParams = useSearchParams();
  const SearchParams = new URLSearchParams(searchParams);

  const regionCodeParams = searchParams.get('regionCode') || '';

  const { replace } = useRouter();

  const arrRegions = useMemo(() => {
    if (regions) {
      return regions?.map((item) => ({ value: item.code, label: item.name }));
    }
  }, [regions]);

  function handleChange(value: string | null) {
    if (value) {
      SearchParams.set('regionCode', value);
      SearchParams.set('offset', '0');
      replace(`?${SearchParams.toString()}`);
      localStorage.setItem('regionCode', value);
    }
  }

  return (
    <div className={styles.filters__selects}>
      <Select
        value={regionCodeParams}
        onChange={(value) => handleChange(value)}
        searchable
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        data={arrRegions}
        placeholder='Локация'
        nothingFoundMessage='Нет совпадений...'
        comboboxProps={{ transitionProps: { transition: 'pop', duration: 500 } }}
      />
    </div>
  );
};

export default RegionSelect;
