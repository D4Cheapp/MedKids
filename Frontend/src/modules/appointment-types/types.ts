import { PaginationParams } from '../types/common';

export interface AppointmentType {
  id: number;
  name: string;
  description?: string;
  duration: number; // in minutes
  isActive: boolean;
  colorCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppointmentTypeDto {
  name: string;
  description?: string;
  duration: number;
  isActive?: boolean;
  colorCode?: string;
}

export interface UpdateAppointmentTypeDto extends Partial<CreateAppointmentTypeDto> {}

export interface AppointmentTypeFilters extends PaginationParams {
  search?: string;
  isActive?: boolean;
}
