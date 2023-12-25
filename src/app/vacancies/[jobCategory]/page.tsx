/* import React, { Suspense } from "react";
import { getDataJobCategory, getRegions } from "@/app/lib/data";
import Finder from "@/components/Finder/Finder";
import Search from "@/components/Search/Search";
import TitleCategory from "@/components/TitleCategory/TitleCategory";
import styles from "./page.module.scss";
import CustomPagination from "@/components/CustomPagination/CustomPagination";

interface Params {
    searchParams?: { text?: string; offset?: string; regionCode?: string };
    params: {
        jobCategory?: string;
    };
}

export default async function JobCategory({ params, searchParams }: Params) {
    const query = searchParams?.text || "";
    const offset = searchParams?.offset || "";
    const regionCode = searchParams?.regionCode || "";
    const jobCategory: string = params.jobCategory || "";

    const data = await getRegions();
    const { results, meta } = await getDataJobCategory(params.jobCategory, query, offset);

    const totalPages = meta.total / 100 > 100 ? 100 : Math.ceil(meta.total / 100);

    return (
        <div className={styles.jobCategory}>
            <CustomPagination query={query} totalPages={totalPages} offset={offset || "0"} />
            <TitleCategory jobCategory={jobCategory} />
            <Search total={meta.total} />
            <Finder
                jobCategory={jobCategory}
                regionCode={regionCode}
                regions={data.data}
                results={results}
                offset={offset}
                query={query}
            />
        </div>
    );
}
 */

import Page from "../(overview)/page";

export default Page;
