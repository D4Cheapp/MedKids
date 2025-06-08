import { Patient } from '../patients/types';

export interface MedicalRecord {
  medical_record_id: number;
  patient: Patient;
  diagnosis: string;
  treatment: string;
  prescriptions: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateMedicalRecordDto {
  patient_id: number;
  doctor_id: number;
  procedure_type_id: number;
  diagnosis: string;
  treatment: string;
  prescriptions: string;
  notes?: string;
}

export interface UpdateMedicalRecordDto extends Partial<CreateMedicalRecordDto> {}
