import { PaginationParams } from '../types/common';

export interface AppointmentReason {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppointmentReasonDto {
  name: string;
  description?: string;
  isActive?: boolean;
}

export interface UpdateAppointmentReasonDto extends Partial<CreateAppointmentReasonDto> {}

export interface AppointmentReasonFilters extends PaginationParams {
  search?: string;
  isActive?: boolean;
}
