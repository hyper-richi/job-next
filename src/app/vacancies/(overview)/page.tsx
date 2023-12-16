import styles from "./page.module.scss";
import Search from "@/components/Search/Search";
import { Metadata } from "next";
import { getVacancies } from "../../lib/data";
import Finder from "@/components/Finder/Finder";

export const metadata: Metadata = {
    title: "Поиск по вакансиям",
};

export default async function Page({ searchParams }: { searchParams?: { text?: string } }) {
    const query = searchParams?.text || "";

    const { results, meta } = await getVacancies(query);

    return (
        <div className={styles.main}>
            <div className={styles.finder__container}>
                <Search total={meta.total} />
                <Finder results={results} query={query}/>
            </div>
        </div>
    );
}
