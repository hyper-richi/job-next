'use client';

import styles from './page.module.scss';
import animationStyles from './animation.module.scss';
import { Params, VacancyTransform } from '../../..';
import FavoritesCard from '@/components/FavoritesCard/FavoritesCard';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useAppDispatch, useAppSelector } from '../lib/store/hooks';
// import { selectStatusUser, selectUser } from '../lib/store/features/authProfile/slice/userSlice';
import { getFavorites, selectFavorites } from '../lib/store/features/favorites/slice/favoritesSlice';
import { createRef, useLayoutEffect, useMemo } from 'react';
import { selectUser } from '../lib/store/features/authProfile/slice/authProfileSlice';

const cardAnimation = {
  enter: animationStyles.cardEnter,
  enterActive: animationStyles.cardEnterActive,
  exit: animationStyles.cardDelete,
  exitActive: animationStyles.cardDeleteActive,
};

export default function Favorites({ params, searchParams }: Params) {
  const authProfile = useAppSelector(selectUser);
  // const statusAuth = useAppSelector(selectStatusUser);

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (authProfile?.id) {
      dispatch(getFavorites(authProfile.id));
    }
  }, [authProfile?.id]);

  const favoritesVacancies = useAppSelector(selectFavorites);

  /*  useLayoutEffect(() => {
    if (!token) {
     // redirect('/login');
    }
  }, [token]); */

  const searchText = searchParams?.text ?? '';
  const offset = searchParams?.offset || '';
  const regionCode = searchParams?.regionCode || '';
  const jobCategory: string = params.jobCategory || '';

  const transformVacancies = useMemo(() => {
    return favoritesVacancies.map((item) => ({ ...item, nodeRef: createRef() }));
  }, [favoritesVacancies]);

  /* if (!authProfile) {
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
        {transformVacancies.length ? (
          <TransitionGroup className={styles.content}>
            {transformVacancies.map((item: VacancyTransform, idx: number) => {
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
            })}
            {/*   </Suspense> */}
          </TransitionGroup>
        ) : (
          <h4 className={styles.empty}>Нет избранных вакансий</h4>
        )}
      </div>
    </div>
  );
}
