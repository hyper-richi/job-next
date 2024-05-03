// http://opendata.trudvsem.ru/api/v1/vacancies?industry=%industry%
//https://opendata.trudvsem.ru/api/v1/vacancies/region/6100000000000?offset=1&limit=100&text=инженер

import axios from 'axios';
import {
  ResponseVacancies,
  ResponseRegions,
  IRegion,
  ResponseVacancy,
  ResponseAdress,
  ResponseTransform,
  VacancyTransform,
} from '../../../..';
import { AuthApiResponse, LoginData, User } from '../store/features/user/types/userSchema';

// "no-store" - SSR getServerSideProps рендер на сервере, Этот запрос должен повторяться при каждом запросе
// "no-cache" ведет себя так же, как no-store в Next.js.
// "force-cache" - SSG getStaticProps статическая генерация страниц,Этот запрос следует кэшировать до тех пор,
// пока он не станет недействительным вручную.
// next: { revalidate: 60 } - ISR getStaticProps and revalidate, Этот запрос должен быть кэширован со временем жизни 60 секунд.

interface QureyParams {
  jobCategory?: string;
  searchText?: string;
  offset?: string;
  regionCode?: string;
}

export async function getVacancies(params: QureyParams) {
  const { jobCategory, offset, searchText, regionCode } = params;
  try {
    let url = `?limit=10&offset=${offset || '0'}`;

    if (regionCode && regionCode !== 'all') {
      url = `/region/${regionCode}` + url;
    }
    if (jobCategory) {
      url = url + `&industry=${jobCategory}`;
    }
    if (searchText) {
      url = url + `&text=${searchText}`;
    }
    console.log('url: ', url);

    const res = await axios.get<ResponseTransform>(process.env.API_BASE_URL + url, {
      transformResponse: (data) => {
        const dataParse: ResponseVacancies = JSON.parse(data);

        const resTransform: ResponseTransform = {
          status: dataParse?.status || '',
          meta: dataParse?.meta || {
            total: 0,
            limit: 100,
          },
          results: {
            vacancies: dataParse?.results.vacancies.map(({ vacancy }) => {
              const vacancyTransform: VacancyTransform = {
                ...vacancy,
                vacancy_id: vacancy.id,
                contact_list: [],
                contact_person: '',
                date: null,
              };

              return vacancyTransform;
            }),
          },
        };

        return resTransform;
      },
      responseType: 'json',
    });

    return res.data;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw new Error('Failed to fetch Vacancies data');
  }
}

export async function getRegions(): Promise<ResponseRegions> {
  try {
    const res = await fetch('https://trudvsem.ru/iblocks/flat_filter_prr_search_cv/ref/regions', {
      cache: 'no-store',
    });
    const regionMock: IRegion = {
      code: 'all',
      name: 'Россия',
      shortName: '',
      text: '',
      key: '',
    };
    const { data, code }: ResponseRegions = await res.json();
    const resObj: ResponseRegions = {
      data: [regionMock, ...data],
      code,
    };
    return resObj;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw new Error('Failed to fetch Regions data.');
  }
}

export async function getVacancy(companyId: string, vacancy_id: string): Promise<ResponseVacancy> {
  try {
    const url = `/vacancy/${companyId}/${vacancy_id}`;
    const res = await fetch(process.env.API_BASE_URL + url, {
      cache: 'no-store',
    });

    return res.json();
  } catch (error) {
    console.error('Fetch Error:', error);
    throw new Error('Failed to fetch Vacancy data.');
  }
}

export async function getAdress(latitude: string, longitude: string): Promise<ResponseAdress> {
  try {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${'aa335a498cd141c2b240085fa3c2b025'}`;
    const res = await fetch(url, {
      cache: 'no-store',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status.code === 200) {
          return data;
        } else {
          console.error('Reverse geolocation request failed.');
          throw new Error('Reverse geolocation request failed');
        }
      });
    return res;
  } catch (error) {
    console.error('Reverse geolocation request failed.', error);
    throw new Error('Reverse geolocation request failed.');
  }
}

export async function getUsers(): Promise<User[]> {
  try {
    const resp = await fetch(process.env.MOKKY_JOB_URL + '/users', {
      cache: 'no-store',
    })
      .then((response) => response.json())
      .then((data) => data);
    return resp;
  } catch (error) {
    console.error('catch Request users failed.', error);
    throw new Error('catch Request users failed.');
  }
}

export async function authUser(loginData: LoginData) {
  return await axios.post<AuthApiResponse>(process.env.MOKKY_JOB_URL + '/auth', loginData).then((data) => {
    return data.data;
  });
  // .catch((error) => console.log('error', error));
}

/* id: vacancy.id,
              category: vacancy.category,
              salary_min: vacancy.salary_min,
              salary_max: vacancy.salary_max,
              addresses: vacancy.addresses,
              duty: vacancy.duty,
              requirement: vacancy.requirement,
              region: vacancy.region,
              company: vacancy.company,
              'job-name': vacancy['job-name'],
              salary: vacancy.salary,
              work_places: vacancy.work_places,
              employment: vacancy.employment,
              schedul: vacancy.schedule,
              vac_url: vacancy.vac_url, */
