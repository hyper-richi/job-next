import styles from "./page.module.scss";
import Search from "@/components/Search/Search";
import { Metadata } from "next";
import { getVacancies } from "../../lib/data";
import Finder from "@/components/Finder/Finder";
import CustomPagination from "@/components/CustomPagination/CustomPagination";

export const metadata: Metadata = {
    title: "Поиск по вакансиям",
};

interface Params {
    searchParams?: { text?: string; offset: string };
}

export default async function Page({ searchParams }: Params) {
    const query = searchParams?.text || "";
    const offset = searchParams?.offset || "";
  //  console.log("offset-Page: ", offset);
    // console.log("searchParams: ", searchParams);
    const { results, meta } = await getVacancies(query, offset);
  //  console.log("results: ", results?.vacancies[0].vacancy.id);
    //  console.log("meta: ", meta);
// c%23
    const totalPages = meta.total / 100 > 100 ? 100 : meta.total / 100 < 1 ? 1 : meta.total / 100;
    // console.log("totalPages: ", totalPages);

    return (
        <div className={styles.main}>
            <CustomPagination query={query} totalPages={totalPages} offset={offset || "0"} />
            <div className={styles.finder__container}>
                <Search total={meta.total} />
                <Finder results={results} query={query} />
            </div>
        </div>
    );
}
