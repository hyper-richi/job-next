import { VacancyCardProps as VacancyCardProps } from './VacancyCard.props';
import styles from './VacancyCard.module.scss';
import Link from 'next/link';
import PointIcon from '../../../public/images/svg/PointIcon';

export default async function VacancyCard({ regionCode, vacancy, offset, searchText, jobCategory }: VacancyCardProps) {
  // await new Promise((resolve) => setTimeout(resolve, 0));
  const { 'job-name': vacancyName, salary_min, salary_max, category, company, id: vacancyId } = vacancy.vacancy;

  let url = `/vacancies/vacancy/${company.companycode}/${vacancyId}?`;
  if (jobCategory) {
    url = url + `jobCategory=${jobCategory}&`;
  }
  if (regionCode) {
    url = url + `regionCode=${regionCode}&`;
  }
  if (offset) {
    url = url + `offset=${offset}&`;
  }

  if (searchText) {
    url = url + `text=${encodeURIComponent(searchText)}`;
  }

  return (
    <div className={styles.vacancy}>
      <div className={styles.vacancy__hr}></div>
      <Link prefetch={false} className={styles.vacancy__link} href={url} target='_blank'>
        <h6 className={styles.vacancy__title}>{vacancyName.charAt(0).toUpperCase() + vacancyName.slice(1)}</h6>
        <div className={styles.vacancy__info}>
          <div className={styles.vacancy__info__location}>
            <PointIcon style={{ width: 24, height: 24, color: '#4c6888' }} />.
          </div>
          <span className=''>{vacancy.vacancy.region?.name}</span>
          <span className={styles.vacancy__salary}>
            {salary_min}-{salary_max} ₽
          </span>
          <span className={styles.vacancy__info__specialisation}>{category.specialisation}</span>
        </div>
        <svg className={styles.vacancy__arrow} width='9' height='16' viewBox='0 0 9 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M1.847 15.674l6.934-7.13a.783.783 0 000-1.087L1.847.326a1.062 1.062 0 00-1.53 0 1.137 1.137 0 000 1.573L6.248 8 .317 14.1a1.138 1.138 0 000 1.574 1.062 1.062 0 001.53 0z'
            fill='#4C6888'
          ></path>
        </svg>
      </Link>
    </div>
  );
}
