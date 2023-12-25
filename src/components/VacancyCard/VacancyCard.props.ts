import { Vacancy } from "@/app/lib/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface VacancyProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    vacancy: Vacancy;
    searchText?: string;
    offset?: string;
    regionCode?: string;
    jobCategory?: string;
}
