import { PaginationParams } from '../types/common';

export interface AppointmentReason {
  appointment_reason_id: number;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateAppointmentReasonDto {
  name: string;
  description?: string;
  is_active?: boolean;
}

export interface UpdateAppointmentReasonDto extends Partial<CreateAppointmentReasonDto> {}

export interface AppointmentReasonFilters extends PaginationParams {
  search?: string;
  is_active?: boolean;
}
