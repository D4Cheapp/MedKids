export interface District {
  district_id: number;
  name: string;
  description: string;
}

export interface Specialty {
  specialty_id: number;
  name: string;
}

export interface Doctor {
  doctor_id: number;
  last_name: string;
  first_name: string;
  middle_name: string;
  phone: string;
  office: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  specialty: Specialty;
  district: District;
}

export interface DoctorFilters {
  specialty_id?: number;
  district_id?: number;
  search?: string;
}
