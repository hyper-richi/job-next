import { ResultsTransform } from '../../..';

export interface ListVacanciesProps {
  searchText?: string;
  offset?: string;
  jobCategory?: string;
  regionCode?: string;
  totalPages?: number;
  vacancies?: ResultsTransform;
}
