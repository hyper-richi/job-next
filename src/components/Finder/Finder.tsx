import VacancyCard from "../VacancyCard/VacancyCard";
import { VacancySkeleton, VacancysSkeleton } from "../VacancysSkeleton/VacancysSkeleton";
import { FinderProps } from "./Finder.props";
import styles from "./Finder.module.scss";
import React, { Suspense } from "react";

export default function Finder({ results, query }: FinderProps) {
    return (
        <div className={styles.finder}>
            <div className={styles.filters}>
                <div className={styles.filters__header}>
                    <h6 className={styles.filters__title}>Фильтры</h6>
                </div>
                <div className={styles.filters__selects}>
                    selects
                    {/* <ul>
                    {location.map((item) => (
                        <li>{item.location}</li>
                    ))}
                </ul> */}
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.content__results}>
                    {/*    <VacancySkeleton /> */}
                    <Suspense key={query} fallback={<VacancysSkeleton />}>
                        {results &&
                            results.vacancies?.map((item) => {
                                return <VacancyCard key={item.vacancy.id} vacancy={item} />;
                            })}
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
