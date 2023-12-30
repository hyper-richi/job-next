import { VacancyRegion } from "@/app/lib/types";

export interface RegionsSchema {
    isLoading: boolean;
    code?: string;
    error?: string;
    data?: VacancyRegion[];
}
