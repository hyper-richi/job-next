import styles from './page.module.scss';
import Search from '@/components/Search/Search';
import { Metadata } from 'next';
import { getRegions, getVacancies } from '../../lib/api/data';
import Finder from '@/components/Finder/Finder';
import CustomPagination from '@/components/CustomPagination/CustomPagination';
import TitleCategory from '@/components/TitleCategory/TitleCategory';
import { Params } from '../../../..';

export const metadata: Metadata = {
  title: 'Поиск по вакансиям | Все вакансии',
};

export default async function Page({ params, searchParams }: Params) {
  const searchText = searchParams?.text || '';
  const offset = searchParams?.offset || '';
  const regionCode = searchParams?.regionCode || '';
  const jobCategory: string = params.jobCategory || '';

  const { results: vacancies, meta } = await getVacancies({
    searchText,
    offset,
    regionCode,
    jobCategory,
  });

  const regions = await getRegions();

  const totalPages = meta?.total / 50 > 50 ? 50 : Math.ceil(meta?.total / 50);

  return (
    <div className={styles.vacancies}>
      <CustomPagination totalPages={totalPages} />
      <TitleCategory jobCategory={jobCategory || '/vacancies'} />
      <Search countVacancies={meta?.total || 0} />
      <Finder
        regions={regions}
        vacancies={vacancies}
        searchText={searchText}
      />
    </div>
  );
}
