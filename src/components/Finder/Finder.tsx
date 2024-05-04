import VacancyCard from '../VacancyCard/VacancyCard';
import { VacancysSkeleton } from '../VacancysSkeleton/VacancysSkeleton';
import { FinderProps } from './Finder.props';
import React, { Suspense } from 'react';
import RegionSelect from '../RegionSelect/RegionSelect';
import { Vacancy, VacancyTransform } from '../../..';
import styles from './Finder.module.scss';
import ListVacancies from '../ListVacancies/ListVacancies';

export default function Finder({ vacancies, regions, regionCode, searchText, offset, jobCategory }: FinderProps) {
  return (
    <div className={styles.finder}>
      <div className={styles.filters}>
        <div className={styles.filters__header}>
          <h6 className={styles.filters__title}>Фильтры</h6>
        </div>
        <RegionSelect regions={regions} />
      </div>
      <ListVacancies vacancies={vacancies} searchText={searchText}/>
      {/* <div className={styles.content}>
        <div className={styles.content__results}>
          <Suspense key={searchText} fallback={<VacancysSkeleton />}>
            {vacancies?.vacancies ? (
              vacancies.vacancies?.map((item: VacancyTransform, idx: number) => {
                return (
                  <VacancyCard
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
              <h4 className={styles.empty}>Ничего не найдено</h4>
            )}
          </Suspense>
        </div>
      </div> */}
    </div>
  );
}
