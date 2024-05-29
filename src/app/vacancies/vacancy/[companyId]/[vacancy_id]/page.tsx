import { getAdress, getVacancy } from '@/app/lib/api/data';
import parse /* { DOMNode, Element, domToReact } */ from 'html-react-parser';
import styles from './page.module.scss';
import { notFound } from 'next/navigation';
import CountVacancyIcon from '../../../../../../public/images/svg/countVacancy.svg';
import Link from 'next/link';
import VacancyShare from '@/components/VacancyShare/VacancyShare';
import MapVacancy from '@/components/MapVacancy/MapVacancy';
import ButtonBack from '@/components/ButtonBack/ButtonBack';
import Adress from '@/components/Adress/Adress';
import PointIcon from '../../../../../../public/images/svg/PointIcon';
import { ResponseAdress } from '../../../../../..';

interface Params {
  searchParams?: { text?: string; offset?: string; jobCategory?: string; regionCode?: string };
  params: { companyId: string; vacancy_id: string };
}

export default async function Vacancy({ params, searchParams }: Params) {
  const companyId = params.companyId;
  const vacancy_id = params.vacancy_id;

  const searchText = searchParams?.text ?? '';
  const offset = searchParams?.offset;
  const regionCode = searchParams?.regionCode;
  const jobCategory = searchParams?.jobCategory;

  let url = `https://job-next.vercel.app/vacancies/vacancy/${companyId}/${vacancy_id}?`;
  if (jobCategory) {
    url = url + `jobCategory=${jobCategory}`;
  }
  if (regionCode) {
    url = url + `&regionCode=${regionCode}`;
  }
  if (offset) {
    url = url + `&offset=${offset}`;
  }

  if (searchText) {
    url = url + `&text=${encodeURIComponent(searchText)}`;
  }

  const { results } = await getVacancy(companyId, vacancy_id);
  const vacancy = Object.keys(results).length ? results.vacancies[0].vacancy : null;

  if (!vacancy) {
    notFound();
  }

  const longitude = vacancy.addresses?.address[0]?.lng;
  const latitude = vacancy.addresses?.address[0]?.lat;

  let dataAdress: ResponseAdress | undefined;

  if (longitude && latitude) {
    dataAdress = await getAdress(latitude, longitude);
  }

  const location = vacancy.addresses?.address[0]?.location;

  const duty = vacancy.duty ? parse(vacancy.duty) : null;
  const qualification = vacancy.requirement.qualification ? parse(vacancy.requirement.qualification || '') : null;

  const experience = function (experience: number) {
    switch (experience) {
      case 0:
        return 'Без опыта';
      case 1:
        return `${experience} год`;
      case 2:
      case 3:
      case 4:
        return `${experience} года`;
      default:
        return `${experience} лет`;
    }
  };

  return (
      <div className={styles.container}>
        <div className={styles.vacancy}>
          <div className={styles.vacancy__info}>
            <ButtonBack />
            <div className={styles.vacancy__info__title}>
              <div className={styles.vacancy__info__title__city}>
                <div className={styles.vacancy__info__title__city__icon}>
                  <PointIcon style={{ width: 24, height: 24, color: '#4c6888' }} />
                </div>
                {vacancy.region.name}
              </div>
              <span>{vacancy.company.name}</span>
            </div>
            <h1 className={styles.vacancy__info__name}>
              {vacancy['job-name'].charAt(0).toUpperCase() + vacancy['job-name'].slice(1)}
            </h1>
            <p className={styles.vacancy__info__salary}>
              {vacancy?.salary && vacancy?.salary !== 'от 0'
                ? `${vacancy.salary_min}-${vacancy.salary_max} ₽`
                : '«з/п по договоренности»'}
            </p>
            <div className={styles.vacancy__info__workplaces}>
              <div className={styles.vacancy__info__count}>
                <CountVacancyIcon width='18' height='22' />
                <p className={styles.workplaces}>Количество рабочих мест: {vacancy.work_places}</p>
              </div>
              <Adress adress={dataAdress?.results} location={location} />
            </div>
            <MapVacancy lng={longitude || ''} lat={latitude || ''} />
            <div className={styles.vacancy__info__body}>
              <div>
                <p>
                  <strong>Вам предстоит: </strong>
                </p>
                <div className={styles.vacancy__duty}>{duty}</div>
                <div>
                  <p>
                    <strong>Мы ожидаем: </strong>
                  </p>
                  <ul>
                    <li>Образование:{` ${vacancy.requirement.education}`};</li>
                    <li>Опыт работы:{` ${experience(vacancy.requirement.experience)}`};</li>
                  </ul>
                  <p>
                    <strong>Тип занятости:</strong>
                  </p>
                  <ul>
                    <li>{vacancy.employment}</li>
                    <li>{vacancy.schedule}</li>
                  </ul>
                  {qualification && (
                    <div>
                      <p>
                        <strong>Мы предлагаем:</strong>
                      </p>
                      <div>{qualification}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.vacancy__actions__desktop}>
                <Link prefetch={false} className={styles.vacancy__actions__apply} href={vacancy.vac_url} target='_blank'>
                  Откликнуться
                </Link>
                <VacancyShare textURL={url} />
              </div>
            </div>
          </div>
          <div className={styles.vacancy__actions__mobile}>
            <Link prefetch={false} className={styles.vacancy__actions__apply} href={vacancy.vac_url} target='_blank'>
              Откликнуться
            </Link>
            <VacancyShare textURL={url} />
          </div>
        </div>
      </div>
  );
}
