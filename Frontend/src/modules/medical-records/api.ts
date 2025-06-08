import { ApiMethods } from 'utils/request';
import { request } from 'utils/request';
import {
  MedicalRecord,
  CreateMedicalRecordDto,
  UpdateMedicalRecordDto,
} from './types';

export const medicalRecordsApi = {
  create: (data: CreateMedicalRecordDto) =>
    request<MedicalRecord>({
      method: ApiMethods.POST,
      url: '/medical-records',
      body: data,
    }),

  update: (id: string | number, data: UpdateMedicalRecordDto) =>
    request<MedicalRecord>({
      method: ApiMethods.PUT,
      url: `/medical-records/${id}`,
      body: data,
    }),

  getByPatientId: (patientId: string | number) =>
    request<MedicalRecord[]>({
      method: ApiMethods.GET,
      url: `/patients/${patientId}/medical-records`,
    }),

  getById: (recordId: string | number) =>
    request<MedicalRecord>({
      method: ApiMethods.GET,
      url: `/medical-records/${recordId}`,
    }),
};
