import styles from "./page.module.scss";
import Search from "@/components/Search/Search";
import { Metadata } from "next";
import { getData } from "../../lib/data";
import Finder from "@/components/Finder/Finder";

export const metadata: Metadata = {
    title: "Поиск по вакансиям",
};

/* export async function generateStaticParams() {
   // const posts = await fetch('https://.../posts').then((res) => res.json())
    const { results, meta } = await getData();

    return results.vacancies.map((post) => ({
      slug: post.slug,
    }))
  } */

export default async function Page({ searchParams }: { searchParams?: { text?: string } }) {
    const query = searchParams?.text || "";

    const { results, meta } = await getData(query);

    return (
        <div className={styles.main}>
            <Search total={meta.total} />
            <Finder results={results} query={query} />
        </div>
    );
}
