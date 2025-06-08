import { AppointmentType } from '@/modules/appointment-types/types';
import { Doctor } from '@/modules/doctors/types';
import { MedicalRecord } from '@/modules/medical-records/types';
import { Patient } from '@/modules/patients/types';

import { PatientRecordForm } from './PatientRecordForm';
import { PatientRecordList } from './PatientRecordList';

type Props = {
  patient: Patient;
  records: MedicalRecord[];
  procedures: AppointmentType[];
  doctors: Doctor[];
};

export const PatientRecords = ({ patient, records, procedures, doctors }: Props) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Форма приема пациента</h1>
      <p className="text-lg">
        {patient.last_name} {patient.first_name} {patient.middle_name}
      </p>
      <PatientRecordForm patient={patient} procedures={procedures} doctors={doctors} />
      <PatientRecordList records={records} />
    </div>
  );
};
