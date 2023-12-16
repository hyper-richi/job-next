import React, { Suspense } from "react";
import { getDataJobCategory } from "@/app/lib/data";
import Finder from "@/components/Finder/Finder";
import Search from "@/components/Search/Search";
import TitleCategory from "@/components/TitleCategory/TitleCategory";
import styles from "./page.module.scss";
import { VacancysSkeleton } from "@/components/VacancysSkeleton/VacancysSkeleton";

/* export async function generateStaticParams(): Promise<Record<string, string>[]> {
    const posts = await getPosts();
    // Return an array of params to generate static HTML files for.
    // Each entry in the array will be a new page.
    return posts.map(post => ({ id: post.id }));
  } */

export default async function JobCategory({ params, searchParams }: Params) {
    const query = searchParams?.text || "";

    const jobCategory: string = params.jobCategory;
    const { results, meta } = await getDataJobCategory(params.jobCategory, query);

    return (
        <div className={styles.jobCategory}>
            <TitleCategory jobCategory={jobCategory} />
            <Search total={meta.total} />

            <Finder results={results} query={query} />
        </div>
    );
}
