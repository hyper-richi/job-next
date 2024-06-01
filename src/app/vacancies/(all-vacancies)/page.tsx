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
  const searchText = searchParams?.text ?? '';
  const offset = searchParams?.offset || '';
  const regionCode = searchParams?.regionCode || '';
  const jobCategory: string = params.jobCategory || '';

  const response = await getVacancies({
    searchText,
    offset,
    regionCode,
    jobCategory,
  });

  const regions = await getRegions();

  const totalPages = (response?.meta?.total ?? 0) / 50 > 50 ? 50 : Math.ceil((response?.meta?.total ?? 0) / 50);

  return (
    <div className={styles.vacancies}>
      <CustomPagination totalPages={totalPages} />
      <TitleCategory jobCategory={jobCategory || '/vacancies'} />
      <Search countVacancies={response?.meta?.total ?? 0} />
      <Finder regions={regions} vacancies={response?.results} totalPages={totalPages} searchText={searchText} />
    </div>
  );
}
