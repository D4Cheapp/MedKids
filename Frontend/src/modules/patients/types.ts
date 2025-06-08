import { Gender } from 'constants/gender';

export interface Address {
  address_id: number;
  city: string;
  street: string;
  house: string;
  apartment?: string;
  entrance?: string;
  floor?: string;
  intercom?: string;
  comment?: string;
}

export interface Patient {
  patient_id: number;
  last_name: string;
  first_name: string;
  middle_name?: string;
  gender: Gender;
  birth_date: string;
  phone_number: string;
  email?: string;
  parent_phone: string;
  address: Address;
  created_at: string;
  updated_at: string;
}

export interface CreatePatientDto {
  last_name: string;
  first_name: string;
  middle_name?: string;
  gender: Gender;
  birth_date: string;
  phone_number: string;
  email?: string;
  parent_phone: string;
  address_id: number;
}

export interface UpdatePatientDto extends Partial<CreatePatientDto> {}

export interface PatientFilters {
  last_name?: string;
  first_name?: string;
  middle_name?: string;
  birth_date?: string;
  phone_number?: string;
  parent_phone?: string;
}
