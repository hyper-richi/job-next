import styles from "./page.module.scss";
import Search from "@/components/Search/Search";
import { Metadata } from "next";
import { getRegions, getVacancies } from "../../lib/data";
import Finder from "@/components/Finder/Finder";
import CustomPagination from "@/components/CustomPagination/CustomPagination";
import TitleCategory from "@/components/TitleCategory/TitleCategory";

export const metadata: Metadata = {
    title: "Поиск по вакансиям",
};

interface Params {
    searchParams?: { text?: string; offset: string; regionCode?: string };
    params: {
        jobCategory?: string;
    };
}


export default async function Page({ params, searchParams }: Params) {
    const searchText = searchParams?.text || "";
    const offset = searchParams?.offset || "";
    const regionCode = searchParams?.regionCode || "";
    const jobCategory: string = params.jobCategory || "";

    const { results, meta } = await getVacancies({ searchText, offset, regionCode, jobCategory });
    const data = await getRegions();

    const totalPages = meta.total / 100 > 100 ? 100 : Math.ceil(meta.total / 100);

    return (
        <div className={styles.vacancies}>
            <CustomPagination query={searchText} totalPages={totalPages} offset={offset || "0"} />
            <TitleCategory jobCategory={"/vacancies"} />
            <Search total={meta.total} />
            <Finder
                jobCategory={jobCategory}
                regionCode={regionCode}
                regions={data.data}
                results={results}
                offset={offset}
                searchText={searchText}
            />
        </div>
    );
}
