import axios from 'axios';
import { IRegion, ResponseVacancy, ResponseAdress, ResponseTransform, VacancyTransform } from '../../../..';
import { AuthApiResponse, LoginData, User } from '../store/features/authProfile/types/authProfileSchema';

// "no-store" - SSR getServerSideProps рендер на сервере, Этот запрос должен повторяться при каждом запросе
// "no-cache" ведет себя так же, как no-store в Next.js.
// "force-cache" - SSG getStaticProps статическая генерация страниц,Этот запрос следует кэшировать до тех пор,
// пока он не станет недействительным вручную.
// next: { revalidate: 60 } - ISR getStaticProps and revalidate, Этот запрос должен быть кэширован со временем жизни 60 секунд.

interface QureyParams {
  jobCategory?: string | null;
  searchText?: string;
  offset?: string | null;
  regionCode?: string | null;
}

export async function getVacancies(params: QureyParams) {
  const { jobCategory, offset, searchText, regionCode } = params;
  try {
    let url = `?limit=50&offset=${offset || '0'}`;

    if (regionCode && regionCode !== 'all') {
      url = `/region/${regionCode}` + url;
    }
    if (jobCategory) {
      url = url + `&industry=${jobCategory}`;
    }
    if (searchText) {
      url = url + `&text=${searchText}`;
    }

    const res = await fetch(process.env.API_BASE_URL + url, {
      cache: 'no-store',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.status !== '200') {
          throw new Error(`Failed to fetch with status code: ${data?.status}`, data?.status);
        }
        const resTransform: ResponseTransform = {
          status: data?.status || '',
          meta: data?.meta || {
            total: 0,
            limit: 100,
          },
          results: {
            vacancies: data?.results?.vacancies?.map(({ vacancy }: { vacancy: VacancyTransform }) => {
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
      });

    return res;
  } catch (message) {
    throw new Error(`${message}`);
  }
}

export async function getRegions(): Promise<IRegion[]> {
  try {
    const res = await fetch('https://6ede402e6a352dfb.mokky.dev/regions').then((data) => {
      return data;
    });
    const data = await res.json();

    return data;
  } catch (error) {
    throw new Error(`Failed to fetch Regions data: ${error}`);
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
    throw new Error(`Failed to fetch Vacancy data: ${error}`);
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
          throw new Error('Geolocation request failed: getAdress');
        }
      });
    return res;
  } catch (message) {
    throw new Error(`${message}`);
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
    throw new Error('Request users failed');
  }
}

export async function authProfile(loginData: LoginData) {
  return await axios.post<AuthApiResponse>(process.env.MOKKY_JOB_URL + '/auth', loginData).then((data) => {
    return data.data;
  });
}
