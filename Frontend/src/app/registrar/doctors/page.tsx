import { doctorsApi } from '@/modules/doctors/api';
import { PageContainer } from '@/components/PageContainer/PageContainer';
import { DoctorsList } from '@/components/__pages/doctors/DoctorsList';

export default async function DoctorsPage() {
  const doctors = await doctorsApi.getAll({});

  return (
    <PageContainer>
      <DoctorsList initialDoctors={doctors || []} />
    </PageContainer>
  );
}
