import VacancyCard from '../VacancyCard/VacancyCard';
import { VacancysSkeleton } from '../VacancysSkeleton/VacancysSkeleton';
import { FinderProps } from './Finder.props';
import styles from './Finder.module.scss';
import React, { Suspense } from 'react';
import RegionSelect from '../RegionSelect/RegionSelect';

export default function Finder({ vacancies, regions, regionCode, searchText, offset, jobCategory }: FinderProps) {
  const portionVacancies = vacancies?.vacancies.slice(0, 10);
  console.log('portionVacancies: ', portionVacancies);

  return (
    <div className={styles.finder}>
      <div className={styles.filters}>
        <div className={styles.filters__header}>
          <h6 className={styles.filters__title}>Фильтры</h6>
        </div>
        <RegionSelect regions={regions} />
      </div>
      <div className={styles.content}>
        <div className={styles.content__results}>
          <Suspense key={searchText} fallback={<VacancysSkeleton />}>
            {vacancies?.vacancies ? (
              portionVacancies?.map((item, idx) => {
                return (
                  <VacancyCard
                    idx={idx}
                    key={item.vacancy.id}
                    jobCategory={jobCategory}
                    searchText={searchText}
                    offset={offset}
                    regionCode={regionCode}
                    vacancy={item}
                  />
                );
              })
            ) : (
              <h4 className={styles.empty}>Ничего не найдено</h4>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
