import VacancyCard from "../VacancyCard/VacancyCard";
import { VacancySkeleton, VacancysSkeleton } from "../VacancysSkeleton/VacancysSkeleton";
import { FinderProps } from "./Finder.props";
import styles from "./Finder.module.scss";
import React, { Suspense } from "react";
import FinderSelect from "../FinderSelect/FinderSelect";
import { VacancyCardAsync } from "../VacancyCard/VacancyCard.async";
import { AnimatePresence, motion } from "framer-motion";

export default function Finder({ results, regionCode, searchText, offset, jobCategory }: FinderProps) {
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
                    <Suspense key={searchText} fallback={<VacancysSkeleton />}>
                        {results?.vacancies ? (
                            results.vacancies?.map((item, idx) => {
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
