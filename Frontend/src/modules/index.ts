export * from './appointment-reasons/api';
export * from './appointment-types/api';
export * from './patients/api';
export * from './doctors/api';
export * from './appointments/api';
export * from './medical-records/api';

export * from './types/common';

export type {
  AppointmentReason,
  CreateAppointmentReasonDto,
  UpdateAppointmentReasonDto,
  AppointmentReasonFilters,
} from './appointment-reasons/types';

export type {
  AppointmentType,
  CreateAppointmentTypeDto,
  UpdateAppointmentTypeDto,
  AppointmentTypeFilters,
} from './appointment-types/types';

export type {
  Patient,
  CreatePatientDto,
  UpdatePatientDto,
  PatientFilters,
  Address,
} from './patients/types';

export type { Doctor, DoctorFilters, Specialty, District } from './doctors/types';

export type {
  Appointment,
  CreateAppointmentDto,
  UpdateAppointmentDto,
  AppointmentFilters,
  DoctorScheduleParams,
  UpdateAppointmentStatusDto,
  AppointmentStatus,
} from './appointments/types';

export type {
  MedicalRecord,
  CreateMedicalRecordDto,
  UpdateMedicalRecordDto,
} from './medical-records/types';
