import { RegionsSchema } from "./features/regions/types/regions";
import { VacanciesShema } from "./features/vacanciesIsLoading/types/vacancies";

export interface StateSchema {
    regions?: RegionsSchema; //regions: regionsReducer,
    vacancies?: VacanciesShema;
}
