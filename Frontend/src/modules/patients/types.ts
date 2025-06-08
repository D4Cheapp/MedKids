import { GenderType } from '../types/common';

export interface Address {
  id: number;
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
  id: number;
  lastName: string;
  firstName: string;
  middleName?: string;
  gender: GenderType;
  birthDate: string;
  phoneNumber: string;
  email?: string;
  parentPhone: string;
  address: Address;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePatientDto {
  lastName: string;
  firstName: string;
  middleName?: string;
  gender: GenderType;
  birthDate: string;
  phoneNumber: string;
  email?: string;
  parentPhone: string;
  addressId: number;
}

export interface UpdatePatientDto extends Partial<CreatePatientDto> {}

export interface PatientFilters {
  lastName?: string;
  firstName?: string;
  middleName?: string;
  birthDate?: string;
  phoneNumber?: string;
  parentPhone?: string;
}
