import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Vacancy, VacancyTransform } from '../../..';

export interface VacancyCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  vacancy:  VacancyTransform;
  idx?: number;
  openModal: () => void;
}
