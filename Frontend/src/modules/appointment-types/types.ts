import { PaginationParams } from '../types/common';

export interface AppointmentType {
  type_id: number;
  name: string;
  code?: string;
}

export interface CreateAppointmentTypeDto {
  name: string;
  code?: string;
  duration?: string;
}

export interface UpdateAppointmentTypeDto extends Partial<CreateAppointmentTypeDto> {}

export interface AppointmentTypeFilters extends PaginationParams {
  search?: string;
  is_active?: boolean;
}
