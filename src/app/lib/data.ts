import { ResponseData, ResponseVacancy } from "./definitions";

export async function getData(query?: string): Promise<ResponseData> {
    try {
        const searchUrl = `?text=${query}`;
        const res = await fetch(`https://opendata.trudvsem.ru/api/v1/vacancies${searchUrl}`, {
            cache: "no-cache", // "force-cache",
        });

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
            cache: "no-cache", // "force-cache",
        });

        return res.json();
    } catch (error) {
        console.error("Fetch Error:", error);
        throw new Error("Failed to fetch revenue data.");
    }
}
