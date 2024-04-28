'use client';

import styles from './page.module.scss';
import animationStyles from './animation.module.scss';
import { Params, VacancyTransform } from '../../..';
import FavoritesCard from '@/components/FavoritesCard/FavoritesCard';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useSession } from 'next-auth/react';

const cardAnimation = {
  enter: animationStyles.cardEnter,
  enterActive: animationStyles.cardEnterActive,
  exit: animationStyles.cardDelete,
  exitActive: animationStyles.cardDeleteActive,
};

export default function Favorites({ params, searchParams }: Params) {
 // const { data: session } = useSession();

  /* const authUser = useAppSelector(selectAuthUser);
  const statusAuth = useAppSelector(selectStatusAuth); */

  /* const favoritesVacancies = useAppSelector(selectFavorites);
  const token = sessionStorage.getItem('token'); */

  /*  useLayoutEffect(() => {
    if (!token) {
     // redirect('/login');
    }
  }, [token]); */

  const searchText = searchParams?.text || '';
  const offset = searchParams?.offset || '';
  const regionCode = searchParams?.regionCode || '';
  const jobCategory: string = params.jobCategory || '';

  /*  const transformVacancies = useMemo(() => {
    return favoritesVacancies.map((item) => ({ ...item, nodeRef: createRef() }));
  }, [favoritesVacancies]); */

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
          {'transformVacancies.length' ? (
            [].map((item: VacancyTransform, idx: number) => {
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
            <h4 className={styles.empty}>
              Нет избранных вакансий
              {/* {!session && <p>Not logged in!</p>}
              {session && <p>Logged in!</p>} */}
            </h4>
          )}
        </TransitionGroup>
        {/*   </Suspense> */}
      </div>
    </div>
  );
}
