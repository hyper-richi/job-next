'use client';

import { useMemo } from 'react';
import styles from './page.module.scss';
import { useAppSelector } from '../lib/store/hooks';
import { Params, VacancyTransform } from '../../..';
import { selectAuthUser } from '../lib/store/features/auth/slice/authUserSlice';
// import { redirect } from 'next/navigation';
import FavoritesCard from '@/components/FavoritesCard/FavoritesCard';
import { selectFavorites } from '../lib/store/features/favorites/selectors/selectFavorites/selectFavorites';

export default function Favorites({ params, searchParams }: Params) {
  const authUser = useAppSelector(selectAuthUser);
  const favoritesVacancies = useAppSelector(selectFavorites);
  // const StatusFavorites = useAppSelector(selectStatusFavorites);
  /* useLayoutEffect(() => {
    if (!authUser) {
      redirect('/login');
    }
  }, []); */

  const searchText = searchParams?.text || '';
  const offset = searchParams?.offset || '';
  const regionCode = searchParams?.regionCode || '';
  const jobCategory: string = params.jobCategory || '';

  /* const filterFavoritesVacancies = useMemo(
    () => favoritesVacancies.filter((item) => item.userId === authUser?.id),
    [authUser?.id, favoritesVacancies]
  ); */

  return (
    <div>
      <div className={styles.container}>
        <div>
          <h2 className={styles.title}>Избранные вакансии</h2>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          {/*    <Suspense key={searchText} fallback={<VacancysSkeleton />}> */}
          {favoritesVacancies.length ? (
            favoritesVacancies?.map((item: VacancyTransform, idx: number) => {
              return (
                <FavoritesCard
                  idx={idx}
                  key={item.id}
                  jobCategory={jobCategory}
                  searchText={searchText}
                  offset={offset}
                  regionCode={regionCode}
                  vacancy={item}
                />
              );
            })
          ) : (
            <h4 className={styles.empty}>Нет избранных вакансий</h4>
          )}
          {/*   </Suspense> */}
        </div>
      </div>
    </div>
  );
}
