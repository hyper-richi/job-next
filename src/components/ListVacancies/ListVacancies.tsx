'use client';
import { Suspense } from 'react';
import { VacancysSkeleton } from '../VacancysSkeleton/VacancysSkeleton';
import styles from './ListVacancies.module.scss';
import { VacancyTransform } from '../../..';
import { ListVacanciesProps } from '../ListVacancies/ListVacancies.props';
import VacancyCard from '../VacancyCard/VacancyCard';
import { useDisclosure } from '@mantine/hooks';
import SignModal from '../Modals/ModalSignin/ModalSignin';
import { useSearchParams } from 'next/navigation';

const ListVacancies = ({ vacancies }: ListVacanciesProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const searchParams = useSearchParams();
  const searchText = searchParams.get('text') ?? '';

  return (
    <>
      <div className={styles.content}>
        <div className={styles.content__results}>
          <Suspense key={searchText} fallback={<VacancysSkeleton />}>
            {vacancies?.vacancies ? (
              vacancies.vacancies?.map((item: VacancyTransform, idx: number) => {
                return <VacancyCard idx={idx} key={item.id} vacancy={item} openModal={open} />;
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
