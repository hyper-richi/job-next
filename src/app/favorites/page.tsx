'use client';

import { createRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import styles from './page.module.scss';
import animationStyles from './animation.module.scss';
import { useAppSelector } from '../lib/store/hooks';
import { Params, VacancyTransform } from '../../..';
import { selectAuthUser, selectStatusAuth } from '../lib/store/features/auth/slice/authUserSlice';
import FavoritesCard from '@/components/FavoritesCard/FavoritesCard';
import { selectFavorites } from '../lib/store/features/favorites/slice/favoritesSlice';
import { redirect } from 'next/navigation';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const cardAnimation = {
  enter: animationStyles.cardEnter,
  enterActive: animationStyles.cardEnterActive,
  exit: animationStyles.cardDelete,
  exitActive: animationStyles.cardDeleteActive,
};

export default function Favorites({ params, searchParams }: Params) {
  const authUser = useAppSelector(selectAuthUser);
  const statusAuth = useAppSelector(selectStatusAuth);

  const favoritesVacancies = useAppSelector(selectFavorites);
  const token = sessionStorage.getItem('token');

  useLayoutEffect(() => {
    if (!token) {
      redirect('/login');
    }
  }, [token]);

  const searchText = searchParams?.text || '';
  const offset = searchParams?.offset || '';
  const regionCode = searchParams?.regionCode || '';
  const jobCategory: string = params.jobCategory || '';

  const transformVacancies = useMemo(() => {
    return favoritesVacancies.map((item) => ({ ...item, nodeRef: createRef() }));
  }, [favoritesVacancies]);

  /* if (!authUser) {
    return null;
  } */

  return (
    <div>
      <div className={styles.container}>
        <div>
          <h2 className={styles.title}>Избранные вакансии</h2>
        </div>
      </div>
      <div className={styles.container}>
        {/*    <Suspense key={searchText} fallback={<VacancysSkeleton />}> */}
        <TransitionGroup className={styles.content}>
          {transformVacancies.length ? (
            transformVacancies.map((item: VacancyTransform, idx: number) => {
              return (
                <CSSTransition key={item.id} nodeRef={item.nodeRef} timeout={300} classNames={cardAnimation}>
                  <FavoritesCard
                    idx={idx}
                    key={item.id}
                    jobCategory={jobCategory}
                    searchText={searchText}
                    offset={offset}
                    regionCode={regionCode}
                    vacancy={item}
                  />
                </CSSTransition>
              );
            })
          ) : (
            <h4 className={styles.empty}>Нет избранных вакансий</h4>
          )}
        </TransitionGroup>
        {/*   </Suspense> */}
      </div>
    </div>
  );
}
