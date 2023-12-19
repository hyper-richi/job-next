// http://opendata.trudvsem.ru/api/v1/vacancies?industry=%industry%
// `?industry=${jobCategory}`

// https://job.ozon.ru/vacancy/?department=Ozon&speci

// "no-store" - SSR getServerSideProps рендер на сервере
// "force-cache" - SSG getStaticProps статическая генерация страниц
// next: { revalidate: 60 } - ISR getStaticProps and revalidate
// offset=1&limit=100
export async function getVacancies(query?: string, offset?: string): Promise<ResponseData> {
    // console.log("offset-getVacancies: ", offset);
    // const computedOffset = !!offset ? Number(offset) - 1 : 0;
    try {
        const searchUrl = `?offset=${offset || "0"}&limit=100` + `&text=` + query;
        // console.log("searchUrl: ", searchUrl);

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
            cache: "no-store", // "force-cache", no-store - SSR getServerSideProps
        });

        return res.json();
    } catch (error) {
        console.error("Fetch Error:", error);
        throw new Error("Failed to fetch revenue data.");
    }
}
// http://opendata.trudvsem.ru/api/v1/vacancies?industry=%industry%

export async function getDataJobCategory(jobCategory?: string, query?: string, offset?: string): Promise<ResponseData> {
    try {
        /*  let url = "";
        if (!!offset) {
            url = `?industry=${jobCategory}&text=${query}&offset=${offset}&limit=100`;
        } else {
            url = `?industry=${jobCategory}&text=${query}`;
        } */
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
