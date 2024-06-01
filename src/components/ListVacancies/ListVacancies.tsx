'use client';
import { Suspense, useLayoutEffect } from 'react';
import { VacancysSkeleton } from '../VacancysSkeleton/VacancysSkeleton';
import styles from './ListVacancies.module.scss';
import { VacancyTransform } from '../../..';
import { ListVacanciesProps } from '../ListVacancies/ListVacancies.props';
import VacancyCard from '../VacancyCard/VacancyCard';
import { useDisclosure } from '@mantine/hooks';
import SignModal from '../Modals/ModalSignin/ModalSignin';
import { getFavorites } from '@/app/lib/store/features/favorites/slice/favoritesSlice';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { selectUser } from '@/app/lib/store/features/authProfile/slice/authProfileSlice';

// import { useSearchParams } from 'next/navigation';

const ListVacancies = ({ vacancies, searchText }: ListVacanciesProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useAppDispatch();
  const authProfile = useAppSelector(selectUser);

  useLayoutEffect(() => {
    if (authProfile?.id) {
      dispatch(getFavorites(authProfile?.id));
    }
  }, [authProfile]);

  return (
    <>
      <div className={styles.content}>
        <div className={styles.content__results}>
          <Suspense key={searchText} fallback={<VacancysSkeleton />}>
            {vacancies?.vacancies ? (
              vacancies?.vacancies.map((item: VacancyTransform, idx: number) => {
                return <VacancyCard idx={idx} key={item.id} vacancy={item} openModal={open} /* isFavorites={} */ />;
              })
            ) : (
              <h4 className={styles.empty}>Ничего не найдено</h4>
            )}
          </Suspense>
        </div>
      </div>
      <SignModal opened={opened} openModal={open} closeModal={close} />
    </>
  );
};

export default ListVacancies;
