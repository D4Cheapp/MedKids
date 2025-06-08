export interface District {
  district_id: number;
  name: string;
}

export interface Specialty {
  specialty_id: number;
  name: string;
}

export interface Doctor {
  doctor_id: number;
  last_name: string;
  first_name: string;
  middle_name?: string;
  photo_url?: string;
  specialty: Specialty;
  districts: District[];
  experience_years: number;
  education?: string;
  description?: string;
  schedule: Record<
    string,
    {
      is_working: boolean;
      start_time?: string;
      end_time?: string;
      break_start_time?: string;
      break_end_time?: string;
    }
  >;
  created_at: string;
  updated_at: string;
}

export interface DoctorFilters {
  specialty_id?: number;
  district_id?: number;
  search?: string;
}
