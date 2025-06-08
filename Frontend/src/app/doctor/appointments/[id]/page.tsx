import { appointmentTypesApi } from '@/modules/appointment-types/api';
import { doctorsApi } from '@/modules/doctors/api';
import { medicalRecordsApi } from '@/modules/medical-records/api';
import { patientsApi } from '@/modules/patients/api';
import { PageContainer } from 'components/PageContainer/PageContainer';
import { Routes } from 'constants/routes';
import { PatientRecords } from 'pages/patient-records/PatientRecords';

import { redirect } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const records = await medicalRecordsApi.getByPatientId(Number(id));
  const patient = await patientsApi.getById(Number(id));
  const procedures = await appointmentTypesApi.getAll();
  const doctors = await doctorsApi.getAll();

  if (!patient) redirect(Routes.DoctorAppointments);

  return (
    <PageContainer>
      <PatientRecords
        records={records || []}
        patient={patient}
        procedures={procedures || []}
        doctors={doctors || []}
      />
    </PageContainer>
  );
};

export default Page;
