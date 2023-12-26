import { StateSchema } from "@/app/lib/StateSchema";

export const selectVacanciesIsLoading = (state: StateSchema) => state.vacancies?.vacanciesIsLoading;
