'use client';

import { useCallback, useMemo, useState } from 'react';
import { VacancyCardProps } from './VacancyCard.props';
import styles from './VacancyCard.module.scss';
import Link from 'next/link';
import PointIcon from '../../../public/images/svg/PointIcon';
import { IconStar } from '@tabler/icons-react';
import { UnstyledButton } from '@mantine/core';
import CustomNotification from '../CustomNotification/CustomNotification';
import { ResponseError, VacancyTransform } from '../../..';
import { addFavorites, selectFavorites } from '@/app/lib/store/features/favorites/slice/favoritesSlice';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { selectUser } from '@/app/lib/store/features/authProfile/slice/authProfileSlice';
import clsx from 'clsx';
import { useParams, useSearchParams } from 'next/navigation';
//import { useSession } from 'next-auth/react';
//import { useDisclosure } from '@mantine/hooks';
// import { selectFavorites } from '@/app/lib/store/features/favorites/selectors/selectFavorites/selectFavorites';

export default function VacancyCard({ vacancy, openModal }: VacancyCardProps) {
  const dispatch = useAppDispatch();
  const authProfile = useAppSelector(selectUser);
  const searchParams = useSearchParams();
  const offset = searchParams.get('offset');
  const regionCode = searchParams.get('regionCode');
  const searchText = searchParams.get('text');
  const { jobCategory } = useParams<{ jobCategory: string; item: string }>();
  const [isClick, setisClick] = useState(false);

  const favoritesVacancies = useAppSelector(selectFavorites);

  const { 'job-name': vacancyName, salary_min, salary_max, category, company, id: vacancy_id } = vacancy;

  let url = `/vacancies/vacancy/${company.companycode}/${vacancy_id}?`;
  if (jobCategory) {
    url = url + `jobCategory=${jobCategory}&`;
  }
  if (regionCode) {
    url = url + `regionCode=${regionCode}&`;
  }
  if (offset) {
    url = url + `offset=${offset}`;
  }

  if (searchText) {
    url = url + `&text=${encodeURIComponent(searchText)}`;
  }

  const mods = useMemo(
    () => ({
      [styles.isFavorites]: !!favoritesVacancies.find((item: VacancyTransform) => item.vacancy_id === vacancy.vacancy_id)?.vacancy_id,
      [styles.animation__icon]: isClick,
    }),
    [authProfile?.id, favoritesVacancies.length, isClick]
  );

  const handleClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      setisClick(true);
      try {
        if (authProfile?.id) {
          let currentDate = new Date();
          const currentData = {
            year: currentDate.getFullYear(),
            month: currentDate.getMonth() + 1,
            day: currentDate.getDate(),
            hours: currentDate.getHours(),
            minutes: currentDate.getMinutes(),
          };
          const transformVacancy: VacancyTransform = {
            ...vacancy,
            user_id: authProfile?.id,
            date: currentData,
            // nodeRef: createRef(null),
          };

          await dispatch(addFavorites(transformVacancy)).unwrap();

          CustomNotification({
            title: 'Вакансия',
            message: 'Вакансия успешно добавлена в избранное!',
            variant: 'success',
          });
        } else {
          openModal();
        }
      } catch (rejectedError) {
        const rejectValue = rejectedError as ResponseError;
        CustomNotification({
          message: rejectValue.message,
          additionalMessage: rejectValue.additionalMessage,
          variant: 'error',
        });
      }
    },
    [authProfile?.id]
  );

  return (
    <div className={styles.vacancy}>
      <div className={styles.vacancy__hr}></div>
      <div className={styles.vacancy__link}>
        <div className={styles.vacancy__head}>
          <Link prefetch={false} className={styles.head__link} href={url} target='_blank'>
            <h6 className={styles.vacancy__title}>{vacancyName.charAt(0).toUpperCase() + vacancyName.slice(1)}</h6>
          </Link>
          <UnstyledButton onClick={handleClick} className={styles.head__favorites}>
            <IconStar className={clsx(styles.head__icon, mods)} />
          </UnstyledButton>
        </div>

        <div className={styles.vacancy__info}>
          <div className={styles.vacancy__info__location}>
            <PointIcon style={{ width: 24, height: 24, color: '#4c6888' }} />.
          </div>
          <span>{vacancy.region?.name}</span>
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
      </div>
    </div>
  );
}
