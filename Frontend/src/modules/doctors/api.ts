import { ApiMethods } from 'utils/request';
import { request } from 'utils/request';
import { Doctor, DoctorFilters } from './types';

export const doctorsApi = {
  getAll: (filters?: DoctorFilters) =>
    request<Doctor[]>({
      method: ApiMethods.GET,
      url: '/doctors',
      body: filters,
    }),

  getById: (id: string | number) =>
    request<Doctor>({
      method: ApiMethods.GET,
      url: `/doctors/${id}`,
    }),
};
