export interface District {
  id: number;
  name: string;
}

export interface Specialty {
  id: number;
  name: string;
}

export interface Doctor {
  id: number;
  lastName: string;
  firstName: string;
  middleName?: string;
  photoUrl?: string;
  specialties: Specialty[];
  districts: District[];
  experienceYears: number;
  education?: string;
  description?: string;
  schedule: Record<string, {
    isWorking: boolean;
    startTime?: string;
    endTime?: string;
    breakStartTime?: string;
    breakEndTime?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface DoctorFilters {
  specialtyId?: number;
  districtId?: number;
  search?: string;
}
