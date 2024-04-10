'use client';

import { VacancyCardProps } from './FavoritesCard.props';
import styles from './FavoritesCard.module.scss';
import Link from 'next/link';
import PointIcon from '../../../public/images/svg/PointIcon';
import { IconStar } from '@tabler/icons-react';
import { UnstyledButton } from '@mantine/core';
import CustomNotification from '../CustomNotification/CustomNotification';
import { ResponseError } from '../../..';
import { deleteFavorites } from '@/app/lib/store/features/favorites/slice/favoritesSlice';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { selectAuthUser } from '@/app/lib/store/features/auth/slice/authUserSlice';

export default function FavoritesCard({ regionCode, vacancy, offset, searchText, jobCategory }: VacancyCardProps) {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectAuthUser);

  // const favoritesVacancies = useAppSelector(selectFavorites);

  // await new Promise((resolve) => setTimeout(resolve, 0));
  const { 'job-name': vacancyName, salary_min, salary_max, company, vacancy_id, id, date } = vacancy;

  let url = `/vacancies/vacancy/${company.companycode}/${vacancy_id}?`;
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

  async function handleDeleteFavorites(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();

    try {
      if (authUser) {
        await dispatch(deleteFavorites(id)).unwrap();

        CustomNotification({
          title: 'Вакансия',
          message: 'Вакансия успешно удалена из избранного!',
          variant: 'succes',
        });
      }
    } catch (rejectedError) {
      const rejectValue = rejectedError as ResponseError;
      CustomNotification({
        message: rejectValue.message,
        additionalMessage: rejectValue.additionalMessage,
        variant: 'error',
      });
    }
  }

  return (
    <div className={styles.favorites}>
      <div className={styles.favorites__link}>
        <div className={styles.favorites__head}>
          <Link prefetch={false} className={styles.favorites__title__link} href={url} target='_blank'>
            <h6 className={styles.favorites__title}>{vacancyName.charAt(0).toUpperCase() + vacancyName.slice(1)}</h6>
          </Link>
        </div>

        <div className={styles.favorites__info}>
          <div className={styles.favorites__info__location}>
            <PointIcon style={{ width: 24, height: 24, color: '#4c6888' }} />.
          </div>
          <span>{vacancy.region?.name}</span>
          <span className={styles.favorites__salary}>
            {salary_min}-{salary_max} ₽
          </span>
          {/*  <span className={styles.favorites__info__specialisation}>{category.specialisation}</span> */}
        </div>
        <div className={styles.favorites__controls}>
          <Link prefetch={false} className={styles.favorites__apply} href={vacancy.vac_url} target='_blank'>
            Откликнуться
          </Link>
          <UnstyledButton onClick={handleDeleteFavorites} className={styles.favorites__button}>
            <IconStar className={styles.favorites__icon} width={40} height={40} />
          </UnstyledButton>
        </div>
        <div className={styles.favorites__date}>
          <span>Дата:</span>
          <div className={styles.favorites__date}>
            <span>{date?.day}.</span>
            <span>{date?.month}.</span>
            <span>{date?.year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
