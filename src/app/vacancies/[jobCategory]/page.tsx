import React, { Suspense } from "react";

import { getDataJobCategory } from "@/app/lib/data";
import Finder from "@/components/Finder/Finder";
import Search from "@/components/Search/Search";
import TitleCategory from "@/components/TitleCategory/TitleCategory";
import { VacancysSkeleton } from "@/components/VacancysSkeleton/VacancysSkeleton";

export default async function JobCategory({ params }: Params) {
    const jobCategory: string = params.jobCategory;
    const { results, meta } = await getDataJobCategory(params.jobCategory);
    return (
        <div className={"JobCategory"}>
            <TitleCategory jobCategory={jobCategory} />
            <Search total={meta.total} />
            <Finder results={results} />
        </div>
    );
}
