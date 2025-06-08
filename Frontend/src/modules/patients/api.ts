import { ApiMethods } from 'utils/request';
import { request } from 'utils/request';

import { CreatePatientDto, Patient, PatientFilters, UpdatePatientDto } from './types';

export const patientsApi = {
  search: (filters?: PatientFilters) =>
    request<Patient[]>({
      method: ApiMethods.GET,
      url: '/patients',
      body: filters,
    }),

  getById: (id: string | number) =>
    request<Patient>({
      method: ApiMethods.GET,
      url: `/patients/${id}`,
    }),

  create: (data: CreatePatientDto) =>
    request<Patient>({
      method: ApiMethods.POST,
      url: '/patients',
      body: data,
    }),

  update: (id: string | number, data: UpdatePatientDto) =>
    request<Patient>({
      method: ApiMethods.PUT,
      url: `/patients/${id}`,
      body: data,
    }),
};
