import { AppointmentStatus } from 'constants/appointment-status';

import { Doctor } from '../doctors/types';
import { Patient } from '../patients/types';

export interface AppointmentType {
  appointment_type_id: number;
  name: string;
  duration: number; // in minutes
}

export interface AppointmentReason {
  appointment_type_id: number;
  name: string;
}

export interface Appointment {
  appointment_id: number;
  doctor: Doctor;
  patient: Patient;
  type: AppointmentType;
  reason: AppointmentReason;
  appointment_date: string; // YYYY-MM-DD
  start_time: string; // HH:mm:ss
  end_time: string; // HH:mm:ss
  status: AppointmentStatus;
  diagnosis?: string;
  recommendations?: string;
  comments?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateAppointmentDto {
  doctor_id: number;
  patient_id: number;
  type_id: number;
  reason_id: number;
  appointment_date: string; // YYYY-MM-DD
  start_time: string; // HH:mm:ss
  end_time: string; // HH:mm:ss
  status?: AppointmentStatus;
  comments?: string;
}

export interface UpdateAppointmentDto extends Partial<CreateAppointmentDto> {
  diagnosis?: string;
  recommendations?: string;
}

export interface AppointmentFilters {
  doctor_id?: number;
  patient_id?: number;
  start_date?: string; // YYYY-MM-DD
  end_date?: string; // YYYY-MM-DD
  status?: string;
}

export interface DoctorScheduleParams {
  start_date: string; // YYYY-MM-DD
}

export interface UpdateAppointmentStatusDto {
  status: AppointmentStatus;
  comments?: string;
}
