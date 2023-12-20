import styles from "./page.module.scss";
import Search from "@/components/Search/Search";
import { Metadata } from "next";
import { getVacancies } from "../../lib/data";
import Finder from "@/components/Finder/Finder";
import CustomPagination from "@/components/CustomPagination/CustomPagination";
import TitleCategory from "@/components/TitleCategory/TitleCategory";
import { usePathname } from "next/navigation";

export const metadata: Metadata = {
    title: "Поиск по вакансиям",
};

interface Params {
    searchParams?: { text?: string; offset: string };
    params: {
        jobCategory: string;
    };
}

export default async function Page({ params, searchParams }: Params) {
    const query = searchParams?.text || "";
    const offset = searchParams?.offset || "";
    const jobCategory: string = params.jobCategory;

    const { results, meta } = await getVacancies(query, offset);
    const totalPages = meta.total / 100 > 100 ? 100 : Math.ceil(meta.total / 100);

    return (
        <div className={styles.vacancies}>
            <CustomPagination query={query} totalPages={totalPages} offset={offset || "0"} />
            <TitleCategory jobCategory={"/vacancies"} />
            <Search total={meta.total} />
            <Finder results={results} query={query} />
        </div>
    );
}
