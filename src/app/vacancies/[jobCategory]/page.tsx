import React, { Suspense } from "react";
import { getDataJobCategory } from "@/app/lib/data";
import Finder from "@/components/Finder/Finder";
import Search from "@/components/Search/Search";
import TitleCategory from "@/components/TitleCategory/TitleCategory";
import styles from "./page.module.scss";
import { VacancysSkeleton } from "@/components/VacancysSkeleton/VacancysSkeleton";
import CustomPagination from "@/components/CustomPagination/CustomPagination";

/* export async function generateStaticParams(): Promise<Record<string, string>[]> {
    const posts = await getPosts();
    // Return an array of params to generate static HTML files for.
    // Each entry in the array will be a new page.
    return posts.map(post => ({ id: post.id }));
  } */

interface Params {
    params: {
        jobCategory: string;
    };
    searchParams?: { text?: string; offset: string };
}

export default async function JobCategory({ params, searchParams }: Params) {
    const query = searchParams?.text || "";
    const offset = searchParams?.offset || "";

    const jobCategory: string = params.jobCategory;
    const { results, meta } = await getDataJobCategory(params.jobCategory, query, offset);

   // console.log("meta: ", meta);
    // meta: { total: 12431, limit: 100 }
    const totalPages = meta.total / 100 > 100 ? 100 : meta.total / 100 < 1 ? 1 : meta.total / 100;
   // console.log("totalPages: ", totalPages);

    return (
        <div className={styles.jobCategory}>
            <CustomPagination query={query} totalPages={totalPages} offset={offset || "0"} />
            <TitleCategory jobCategory={jobCategory} />
            <Search total={meta.total} />
            <Finder results={results} query={query} />
        </div>
    );
}
