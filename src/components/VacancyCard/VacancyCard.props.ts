import { Vacancy } from "@/app/lib/definitions";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface VacancyProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  vacancy: Vacancy;
}
