import { IRegion, ResultsTransform } from '../../..';

export interface FinderProps {
  searchText?: string;
  offset?: string;
  jobCategory?: string;
  regionCode?: string;
  totalPages?: number;
  vacancies?: ResultsTransform;
  regions?: IRegion[];
}
