import { ApiMethods } from 'utils/request';
import { request } from 'utils/request';
import {
  AppointmentReason,
  CreateAppointmentReasonDto,
  UpdateAppointmentReasonDto,
  AppointmentReasonFilters,
} from './types';

export const appointmentReasonsApi = {
  getAll: (filters?: AppointmentReasonFilters) =>
    request<AppointmentReason[]>({
      method: ApiMethods.GET,
      url: '/appointment-reasons',
      body: filters,
    }),

  getById: (id: string | number) =>
    request<AppointmentReason>({
      method: ApiMethods.GET,
      url: `/appointment-reasons/${id}`,
    }),

  create: (data: CreateAppointmentReasonDto) =>
    request<AppointmentReason>({
      method: ApiMethods.POST,
      url: '/appointment-reasons',
      body: data,
    }),

  update: (id: string | number, data: UpdateAppointmentReasonDto) =>
    request<AppointmentReason>({
      method: ApiMethods.PUT,
      url: `/appointment-reasons/${id}`,
      body: data,
    }),

  delete: (id: string | number) =>
    request<void>({
      method: ApiMethods.DELETE,
      url: `/appointment-reasons/${id}`,
    }),
};
