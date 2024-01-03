import styles from "./page.module.scss";
import Search from "@/components/Search/Search";
import { Metadata } from "next";
import { getRegions, getVacancies } from "../../lib/store/data";
import Finder from "@/components/Finder/Finder";
import CustomPagination from "@/components/CustomPagination/CustomPagination";
import TitleCategory from "@/components/TitleCategory/TitleCategory";
import Container from "@/components/Container/Container";
import Counter from "@/components/Counter/Counter";
import { VacancyRegion } from "@/app/lib/types";

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

    const {
        results: vacancies,
        meta,
        status: statusUploadVacancies,
    } = await getVacancies({ searchText, offset, regionCode, jobCategory });

    const { data: regions, code: statusUploadRegions } = await getRegions();

    const statusUpload = { statusUpload: statusUploadVacancies };

    const totalPages = meta.total / 100 > 100 ? 100 : Math.ceil(meta.total / 100);

    return (
        <div className={styles.vacancies}>
            <CustomPagination totalPages={totalPages} />
            <TitleCategory jobCategory={jobCategory || "/vacancies"} />
            {/*  <Counter /> */}
            <Search countVacancies={meta.total || 0} statusUpload={statusUpload} statusUploadVacancies={statusUploadVacancies} />
            {/*  <Container
                statusUploadRegions={statusUploadRegions}
                statusUploadVacancies={statusUploadVacancies}
                regions={regions}
                vacancies={vacancies}
                totalPages={totalPages}
                countVacancies={meta.total}
                jobCategory={jobCategory}
                regionCode={regionCode}
                offset={offset}
                searchText={searchText}
            /> */}
            <Finder
                regions={regions}
                vacancies={vacancies}
                jobCategory={jobCategory}
                regionCode={regionCode}
                offset={offset}
                searchText={searchText}
                totalPages={totalPages}
            />
        </div>
    );
}
