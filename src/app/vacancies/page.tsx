import styles from "./page.module.scss";
import VacancyCard from "@/components/VacancyCard/VacancyCard";
import { ResponseData } from "../lib/definitions";
import Search from "@/components/Search/Search";
import { Suspense } from "react";
import { VacancysSkeleton } from "@/components/VacancysSkeleton/VacancysSkeleton";
import { Metadata } from "next";
import { getData } from "../lib/data";

export const metadata: Metadata = {
    title: "Поиск по вакансиям",
};

export default async function Page({ searchParams }: { searchParams?: { text?: string } }) {
    const query = searchParams?.text || "";
    const { results, meta } = await getData(query);

    const location = results.vacancies.map((item) => {
        return item.vacancy.addresses.address[0];
    });

    return (
        <div className={styles.main}>
            <Search total={meta.total} />
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
                    <Suspense key={query} fallback={<VacancysSkeleton />}>
                        {results.vacancies?.map((item) => {
                            return <VacancyCard key={item.vacancy.id} vacancy={item} />;
                        })}
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
