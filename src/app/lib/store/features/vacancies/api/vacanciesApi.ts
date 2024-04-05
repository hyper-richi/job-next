import { rtkApi } from '@/app/lib/api/rtkApi';
import { VacancyDev } from '../../../../../../..';

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getVacancies: build.query<VacancyDev, void>({
      query: () => ({
        url: `/users/`,
        method: 'GET',
      }),
    }),
  }),
});

// export const getVacanciesMutation = userApi.endpoints.getVacancies.initiate;

export const getVacanciesQuery = userApi.endpoints.getVacancies.initiate;
