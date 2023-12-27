// http://opendata.trudvsem.ru/api/v1/vacancies?industry=%industry%
// https://job.ozon.ru/vacancy/?department=Ozon&speci

//https://opendata.trudvsem.ru/api/v1/vacancies/region/6100000000000?offset=1&limit=100&text=инженер
// "use client";
import { ResponseData, ResponseRegions, ResponseVacancy } from "../types";

// "no-store" - SSR getServerSideProps рендер на сервере
// "force-cache" - SSG getStaticProps статическая генерация страниц
// next: { revalidate: 60 } - ISR getStaticProps and revalidate

interface QureySearchParams {
    jobCategory: string | null;
    formData: FormData;
    offset: string | null;
    regionCode: string | null;
}

export async function getVacanciesSearch(
    jobCategory: string | null,
    offset: string | null,
    regionCode: string | null,
    formData: FormData,
) {
    // const { jobCategory, offset, formData, regionCode } = params;

    const text = formData?.get("text") || "";

    try {
        let url = `?offset=${offset || "0"}&limit=100`;

        if (regionCode) {
            url = `/region/${regionCode}` + url;
        }
        if (jobCategory) {
            url = url + `&industry=${jobCategory}`;
        }
        if (text) {
            url = url + `&text=${text}`;
        }
        const res = await fetch(process.env.API_BASE_URL + url, {
            cache: "no-store",
        });

        return res.json();
    } catch (error) {
        console.error("Fetch Error:", error);
        throw new Error("Failed to fetch revenue data.");
    }

    // mutate data
    // revalidate cache
}
interface QureyParams {
    jobCategory?: string;
    searchText?: string;
    offset?: string;
    regionCode?: string;
}

export async function getVacancies(params: QureyParams): Promise<ResponseData> {
    const { jobCategory, offset, searchText, regionCode } = params;
    try {
        let url = `?offset=${offset || "0"}&limit=100`;

        if (regionCode) {
            url = `/region/${regionCode}` + url;
        }
        if (jobCategory) {
            url = url + `&industry=${jobCategory}`;
        }
        if (searchText) {
            url = url + `&text=${searchText}`;
        }
        const res = await fetch(process.env.API_BASE_URL + url, {
            cache: "no-store",
        });

        return res.json();
    } catch (error) {
        console.error("Fetch Error:", error);
        throw new Error("Failed to fetch revenue data.");
    }
}

export async function getRegions(): Promise<ResponseRegions> {
    try {
        const res = await fetch("https://trudvsem.ru/iblocks/flat_filter_prr_search_cv/ref/regions", {
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
// vacancies/region/6100000000000?industry=InformationTechnology&offset=0&limit=100

/* export async function getDataJobCategory(jobCategory?: string, query?: string, offset?: string): Promise<ResponseData> {
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
} */
