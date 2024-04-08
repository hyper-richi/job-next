import { VacancyTransform } from '../../../../../../..';

export interface FavoritesApiResponse {
  data: VacancyTransform[];
}

export interface FavoritesSchema {
  status: 'idle' | 'loading' | 'error';
  favorites: VacancyTransform[];
  error: any | null;
}
