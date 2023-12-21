// http://opendata.trudvsem.ru/api/v1/vacancies?industry=%industry%
// https://job.ozon.ru/vacancy/?department=Ozon&speci

import { ResponseData, ResponseVacancy } from "./types";


// "no-store" - SSR getServerSideProps рендер на сервере
// "force-cache" - SSG getStaticProps статическая генерация страниц
// next: { revalidate: 60 } - ISR getStaticProps and revalidate
export async function getVacancies(query?: string, offset?: string): Promise<ResponseData> {
    try {
        const searchUrl = `?offset=${offset || "0"}&limit=100` + `&text=` + query;
        const res = await fetch(process.env.API_BASE_URL + searchUrl, {
            cache: "no-store",
        });
        return res.json();
    } catch (error) {
        console.error("Fetch Error:", error);
        throw new Error("Failed to fetch revenue data.");
    }
}

export async function getVacancy(companyId: string, vacancyId: string): Promise<ResponseVacancy> {
    try {
        const url = `/vacancy/${companyId}/${vacancyId}`;
        const res = await fetch(process.env.API_BASE_URL + url, {
            cache: "no-store",
        });

        return res.json();
    } catch (error) {
        console.error("Fetch Error:", error);
        throw new Error("Failed to fetch revenue data.");
    }
}

export async function getDataJobCategory(jobCategory?: string, query?: string, offset?: string): Promise<ResponseData> {
    try {
        const url = `?industry=${jobCategory}&text=${query}&offset=${offset || "0"}&limit=100`;
        const res = await fetch(process.env.API_BASE_URL + url, {
            cache: "no-store",
        });
        return res.json();
    } catch (error) {
        console.error("Fetch Error:", error);
        throw new Error("Failed to fetch revenue data.");
    }
}
