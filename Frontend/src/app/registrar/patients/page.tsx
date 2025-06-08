import { patientsApi } from '@/modules/patients/api';

import { PatientsList } from '@/components/__pages/patients/PatientsList';
import { PageContainer } from '@/components/PageContainer/PageContainer';

const PatientsPage = async () => {
  const patients = await patientsApi.search();

  return (
    <PageContainer>
      <PatientsList patients={patients || []} />
    </PageContainer>
  );
};

export default PatientsPage;
