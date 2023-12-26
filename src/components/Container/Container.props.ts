import { Results, VacancyRegion } from "@/app/lib/types";

export interface ContainerProps {
    searchText?: string;
    offset?: string;
    jobCategory?: string;
    regionCode?: string;
    statusUploadVacancies: string;
    statusUploadRegions: string;
    results: Results;
    regions?: VacancyRegion[];
    totalPages: number;
    countVacancies: number;
}
