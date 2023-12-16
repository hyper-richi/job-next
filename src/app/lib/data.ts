// http://opendata.trudvsem.ru/api/v1/vacancies?industry=%industry%
// `?industry=${jobCategory}`

// https://job.ozon.ru/vacancy/?department=Ozon&speci

// "no-store" - SSR getServerSideProps рендер на сервере
// "force-cache" - SSG getStaticProps статическая генерация страниц
// next: { revalidate: 60 } - ISR getStaticProps and revalidate

export async function getVacancies(query?: string): Promise<ResponseData> {
    try {
        const searchUrl = `?text=${query}`;
        /*  console.log("Fetching revenue data...");
        await new Promise((resolve) => setTimeout(resolve, 3000));
        console.log('Data fetch completed after 3 seconds.'); */
        const res = await fetch(`https://opendata.trudvsem.ru/api/v1/vacancies${searchUrl}`);
        return res.json();
    } catch (error) {
        console.error("Fetch Error:", error);
        throw new Error("Failed to fetch revenue data.");
    }
}

export async function getVacancie(companyId: string, vacancyId: string): Promise<ResponseVacancy> {
    try {
        const url = `vacancy/${companyId}/${vacancyId}`;
        const res = await fetch(`https://opendata.trudvsem.ru/api/v1/vacancies/${url}`, {
            cache: "no-cache", // "force-cache", no-store - SSR getServerSideProps
        });

        return res.json();
    } catch (error) {
        console.error("Fetch Error:", error);
        throw new Error("Failed to fetch revenue data.");
    }
}
// http://opendata.trudvsem.ru/api/v1/vacancies?industry=%industry%

export async function getDataJobCategory(jobCategory: string, query?: string): Promise<ResponseData> {
    try {
        const url = `?industry=${jobCategory}&${query ? "text=" + query : ""}`;
        const res = await fetch(`https://opendata.trudvsem.ru/api/v1/vacancies${url}`, {
            cache: "no-store",
        });

        return res.json();
    } catch (error) {
        console.error("Fetch Error:", error);
        throw new Error("Failed to fetch revenue data.");
    }
}
