import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { VacancyTransform } from '../../..';

export interface VacancyCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  vacancy: VacancyTransform;
  searchText?: string;
  offset?: string;
  regionCode?: string;
  jobCategory?: string;
  idx?: number;
  openModal: () => void;
}
