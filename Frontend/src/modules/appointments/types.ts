import { Doctor } from '../types/doctors';
import { Patient } from '../types/patients';

export type AppointmentStatus = 'Запланирован' | 'Завершен' | 'Отменен' | 'Неявка';

export interface AppointmentType {
  id: number;
  name: string;
  duration: number; // in minutes
}

export interface AppointmentReason {
  id: number;
  name: string;
}

export interface Appointment {
  id: number;
  doctor: Doctor;
  patient: Patient;
  type: AppointmentType;
  reason: AppointmentReason;
  appointmentDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm:ss
  endTime: string; // HH:mm:ss
  status: AppointmentStatus;
  diagnosis?: string;
  recommendations?: string;
  comments?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppointmentDto {
  doctorId: number;
  patientId: number;
  typeId: number;
  reasonId: number;
  appointmentDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm:ss
  endTime: string; // HH:mm:ss
  status?: AppointmentStatus;
  comments?: string;
}

export interface UpdateAppointmentDto extends Partial<CreateAppointmentDto> {
  diagnosis?: string;
  recommendations?: string;
}

export interface AppointmentFilters {
  doctorId?: number;
  patientId?: number;
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  status?: string;
}

export interface DoctorScheduleParams {
  startDate: string; // YYYY-MM-DD
}

export interface UpdateAppointmentStatusDto {
  status: AppointmentStatus;
  comments?: string;
}
