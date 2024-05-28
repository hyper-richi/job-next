import { ResultsTransform, Vacancy } from '../../..';

export interface ListVacanciesProps {
  totalPages?: number;
  vacancies?: /* ResultsTransform | */ Vacancy[];
}
