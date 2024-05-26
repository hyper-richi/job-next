import { IRegion, ResultsTransform } from '../../..';

export interface FinderProps {
  searchText?: string;
  vacancies?: ResultsTransform;
  regions?: IRegion[];
}
