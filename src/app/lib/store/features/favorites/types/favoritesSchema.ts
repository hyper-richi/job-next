import { Vacancy, VacancyDev } from "../../../../../../..";

export interface FavoritesApiResponse {
  data: Vacancy[];
}


export interface FavoritesSchema {
  status: 'idle' | 'loading' | 'error';
  favorites: VacancyDev[] | null;
  error: any | null;
}
