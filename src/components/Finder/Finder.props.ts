import { IRegion, ResultsTransform, Vacancy } from '../../..';

export interface FinderProps {
  searchText?: string;
  totalPages?: number;
  vacancies?: Vacancy[];
  regions?: IRegion[];
}
