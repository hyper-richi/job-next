'use client';

import { useEffect, useLayoutEffect, useMemo } from 'react';
import styles from './page.module.scss';
import { getFavorites, selectFavorites, selectStatusFavorites } from '../lib/store/features/favorites/slice/favoritesSlice';
import { useAppDispatch, useAppSelector } from '../lib/store/hooks';
import { Params, VacancyTransform } from '../../..';
import { selectAuthUser } from '../lib/store/features/auth/slice/authUserSlice';
import { redirect } from 'next/navigation';
import FavoritesCard from '@/components/FavoritesCard/FavoritesCard';

export default function Favorites({ params, searchParams }: Params) {
  const authUser = useAppSelector(selectAuthUser);
  const favoritesVacancies = useAppSelector(selectFavorites);
  // const StatusFavorites = useAppSelector(selectStatusFavorites);
  /* useLayoutEffect(() => {
    if (!authUser) {
      redirect('/login');
    }
  }, []); */

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('useEffect: ');
    dispatch(getFavorites());
  }, [dispatch]);

  const searchText = searchParams?.text || '';
  const offset = searchParams?.offset || '';
  const regionCode = searchParams?.regionCode || '';
  const jobCategory: string = params.jobCategory || '';

  const filterFavoritesVacancies = useMemo(
    () => favoritesVacancies.filter((item) => item.userId === authUser?.id),
    [authUser?.id, favoritesVacancies]
  );

  return (
    <>
      <div className={styles.container}>
        <div>
          <h2 className={styles.title}>Избранные вакансии</h2>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          {/*    <Suspense key={searchText} fallback={<VacancysSkeleton />}> */}
          {filterFavoritesVacancies.length ? (
            filterFavoritesVacancies?.map((item: VacancyTransform, idx: number) => {
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
    </>
  );
}
