import VacancyCard from "../VacancyCard/VacancyCard";
import { VacancySkeleton, VacancysSkeleton } from "../VacancysSkeleton/VacancysSkeleton";
import { FinderProps } from "./Finder.props";
import styles from "./Finder.module.scss";
import React, { Suspense } from "react";
import FinderSelect from "../FinderSelect/FinderSelect";

export default async function Finder({ results, query }: FinderProps) {
    return (
        <div className={styles.finder}>
            <div className={styles.filters}>
                <div className={styles.filters__header}>
                    <h6 className={styles.filters__title}>Фильтры</h6>
                </div>
                <FinderSelect />
            </div>
            <div className={styles.content}>
                <div className={styles.content__results}>
                    {/*   <VacancysSkeleton /> */}
                    <Suspense key={query} fallback={<VacancysSkeleton />}>
                        {results.vacancies ? (
                            results.vacancies?.map((item) => {
                                return <VacancyCard key={item.vacancy.id} vacancy={item} />;
                            })
                        ) : (
                            <h4 className={styles.empty}>Ничего не найдено</h4>
                        )}
                        {/* {results.vacancies?.map((item) => {
                            return <VacancyCard key={item.vacancy.id} vacancy={item} />;
                        })} */}
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
