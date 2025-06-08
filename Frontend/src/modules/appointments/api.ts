import { ApiMethods } from 'utils/request';
import { request } from 'utils/request';
import {
  Appointment,
  CreateAppointmentDto,
  UpdateAppointmentDto,
  AppointmentFilters,
  DoctorScheduleParams,
  UpdateAppointmentStatusDto,
} from './types';

export const appointmentsApi = {
  getAll: (filters: AppointmentFilters) =>
    request<Appointment[]>({
      method: ApiMethods.GET,
      url: '/appointments',
      body: filters,
    }),

  getById: (id: string | number) =>
    request<Appointment>({
      method: ApiMethods.GET,
      url: `/appointments/${id}`,
    }),

  create: (data: CreateAppointmentDto) =>
    request<Appointment>({
      method: ApiMethods.POST,
      url: '/appointments',
      body: data,
    }),

  update: (id: string | number, data: UpdateAppointmentDto) =>
    request<Appointment>({
      method: ApiMethods.PUT,
      url: `/appointments/${id}`,
      body: data,
    }),

  delete: (id: string | number) =>
    request<void>({
      method: ApiMethods.DELETE,
      url: `/appointments/${id}`,
    }),

  getDoctorSchedule: (doctorId: string | number, params: DoctorScheduleParams) =>
    request<Appointment[]>({
      method: ApiMethods.GET,
      url: `/doctors/${doctorId}/schedule`,
      body: params,
    }),

  updateStatus: (id: string | number, data: UpdateAppointmentStatusDto) =>
    request<Appointment>({
      method: ApiMethods.PATCH,
      url: `/appointments/${id}/status`,
      body: data,
    }),
};
