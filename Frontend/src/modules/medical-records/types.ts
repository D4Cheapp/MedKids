import { Patient } from '../patients/types';

export interface MedicalRecord {
  id: number;
  patient: Patient;
  diagnosis: string;
  treatment: string;
  notes?: string;
  recordDate: string;
  nextVisitDate?: string;
  attachments: Array<{
    id: number;
    name: string;
    url: string;
    mimeType: string;
    size: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMedicalRecordDto {
  patientId: number;
  diagnosis: string;
  treatment: string;
  notes?: string;
  recordDate: string;
  nextVisitDate?: string;
  attachments?: Array<{
    name: string;
    url: string;
    mimeType: string;
    size: number;
  }>;
}

export interface UpdateMedicalRecordDto extends Partial<CreateMedicalRecordDto> {}
