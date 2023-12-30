import { RegionsSchema } from "./features/regions/types/regions";
import { VacanciesShema } from "./features/vacancies/types/vacancies";

export interface StateSchema {
    regions?: RegionsSchema; //regions: regionsReducer,
    vacancies?: VacanciesShema;
}
