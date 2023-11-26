import styles from "./page.module.scss";
import Vacancy from "@/components/Vacancy/Vacancy";
import { ResponseData } from "../lib/definitions";
import Search from "@/components/Search/Search";
import { Suspense } from "react";
import { VacancysSkeleton } from "@/components/VacancysSkeleton/VacancysSkeleton";

const getData = async (query?: string): Promise<ResponseData> => {
    const searchUrl = `?text=${query}`;
    const res = await fetch(`https://opendata.trudvsem.ru/api/v1/vacancies${searchUrl}`, {
        cache: "no-cache", // "force-cache",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
};

export default async function Page({ searchParams }: { searchParams?: { text?: string } }) {
    const query = searchParams?.text || "";
    const { results, meta } = await getData(query);

    return (
        <main className={styles.main}>
            <Search total={meta.total} />
            <div className={styles.finder}>
                <div className={styles.filters}>
                    <div className={styles.filters__header}>
                        <h6 className={styles.filters__title}>Фильтры</h6>
                    </div>
                    <div className={styles.filters__selects}>selects</div>
                </div>
                <div className={styles.content}>
                    <Suspense key={query} fallback={<VacancysSkeleton />}>
                        {results.vacancies?.map((item) => {
                            return <Vacancy key={item.vacancy.id} vacancy={item} />;
                        })}
                    </Suspense>
                </div>
            </div>
        </main>
    );
}
