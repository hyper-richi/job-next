'use client';
import styles from './Search.module.scss';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { plural } from '@/app/lib/helpers/plural';
import clsx from 'clsx';
import { useFormStatus } from 'react-dom';
import SpinnerIcon from '../../../public/images/svg/spinnerIcon.svg';
import SearchIcon from '../../../public/images/svg/searchIcon.svg';
import { useDebouncedCallback } from 'use-debounce';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className={styles.search__button} type='submit'>
      {pending ? <SpinnerIcon width='24' height='24' /> : 'Поиск'}
    </button>
  );
}

function Search({ countVacancies }: { countVacancies: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const jobCategory = searchParams.get('jobCategory');
  const encodeSearchText = encodeURIComponent(useSearchParams().get('text') || '');

  // const decodeSearchText = decodeURIComponent(useSearchParams().get('text') || '');

  const offset = searchParams.get('offset');
  const regionCode = searchParams.get('regionCode');

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('text', term);
    } else {
      params.delete('text');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleFormAction = (formData: FormData) => {
    const SearchParams = new URLSearchParams(searchParams);
    const searchTextForm = formData.get('text') as string;

    if (jobCategory || regionCode || offset || searchTextForm) {
      if (jobCategory) SearchParams.set('jobCategory', jobCategory);
      if (regionCode) SearchParams.set('regionCode', regionCode);
      if (offset) SearchParams.set('offset', '0');
      if (searchTextForm) SearchParams.set('text', searchTextForm);
    }

    if (encodeSearchText && !searchTextForm) {
      SearchParams.delete('text');
      replace(`?${SearchParams.toString()}`);
      return;
    }

    if (searchTextForm === encodeSearchText || !searchTextForm) {
      return;
    }
    replace(`?${SearchParams.toString()}`);
  };

  const forms = ['вакансия', 'вакансии', 'вакансий'];

  return (
    <div>
      <div className={clsx(styles.search, styles.desktop)}>
        <h1 className={styles.search__title}>Поиск по вакансиям</h1>
        <form className={styles.search__form} action={handleFormAction}>
          <div className={styles.search__wrap}>
            <SearchIcon className={styles.search__icon} />
            <input
              onChange={(e) => handleSearch(e.target.value)}
              className={styles.search__input}
              placeholder='Введите название должности'
              type='text'
              name='text'
              defaultValue={searchParams.get('text')?.toString()}
            />
            <p className={styles.search__count}>{plural(forms, countVacancies)}</p>
            <SubmitButton />
          </div>
        </form>
      </div>
      <div className={clsx(styles.searchbar, styles.mobile)}>
        <div className={styles.searchbar__wrapper}>
          <div className={styles.searchbar__search}>
            <div className={styles.searchbar__icon}>
              <svg width='16' height='16' viewBox='0 0 16 16' fill='#808D9A' xmlns='http://www.w3.org/2000/svg'>
                <path d='M6.663 11.994a5.33 5.33 0 115.33-5.33.667.667 0 01-1.332 0A3.997 3.997 0 109.49 9.49l.471-.471 4.743 4.743a.667.667 0 01-.942.943l-3.83-3.83a5.311 5.311 0 01-3.269 1.12z'></path>
              </svg>
            </div>
            <form className={styles.search__form} action={handleFormAction}>
              <input
                onChange={(e) => handleSearch(e.target.value)}
                className={styles.search__input}
                placeholder='Введите название должности'
                type='text'
                name='text'
                defaultValue={searchParams.get('text')?.toString()}
              />
              <SubmitButton />
            </form>
          </div>
        </div>
        <p className={styles.search__count}>Найдено: {plural(forms, countVacancies)}</p>
      </div>
    </div>
  );
}

export default Search;
