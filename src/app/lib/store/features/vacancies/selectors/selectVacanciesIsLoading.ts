import { StateSchema } from "@/app/lib/store/StateSchema";

export const selectVacanciesIsLoading = (state: StateSchema) => state.vacancies?.vacanciesIsLoading;
