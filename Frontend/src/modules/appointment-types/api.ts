import { ApiMethods } from 'utils/request';
import { request } from 'utils/request';
import {
  AppointmentType,
  CreateAppointmentTypeDto,
  UpdateAppointmentTypeDto,
  AppointmentTypeFilters,
} from './types';

export const appointmentTypesApi = {
  getAll: (filters?: AppointmentTypeFilters) =>
    request<AppointmentType[]>({
      method: ApiMethods.GET,
      url: '/appointment-types',
      body: filters,
    }),

  getById: (id: string | number) =>
    request<AppointmentType>({
      method: ApiMethods.GET,
      url: `/appointment-types/${id}`,
    }),

  create: (data: CreateAppointmentTypeDto) =>
    request<AppointmentType>({
      method: ApiMethods.POST,
      url: '/appointment-types',
      body: data,
    }),

  update: (id: string | number, data: UpdateAppointmentTypeDto) =>
    request<AppointmentType>({
      method: ApiMethods.PUT,
      url: `/appointment-types/${id}`,
      body: data,
    }),

  delete: (id: string | number) =>
    request<void>({
      method: ApiMethods.DELETE,
      url: `/appointment-types/${id}`,
    }),
};
