import { IRegion, ResultsTransform } from '../../..';

export interface FinderProps {
  searchText?: string;
  totalPages?: number;
  vacancies?: ResultsTransform;
  regions?: IRegion[];
}
