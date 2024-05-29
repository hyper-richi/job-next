import { VacancyTransform } from '../../..';

export interface VacancyCardProps {
  vacancy: VacancyTransform;
  searchText?: string;
  offset?: string;
  regionCode?: string;
  jobCategory?: string;
  idx?: number;
}
