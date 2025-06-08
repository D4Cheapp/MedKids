import { appointmentsApi } from '@/modules/appointments/api';

import { AppointmentsList } from '@/components/__pages/appointments/AppointmentsList';
import { PageContainer } from '@/components/PageContainer/PageContainer';

export default async function AppointmentsPage() {
  const appointments = await appointmentsApi.getAll({});

  return (
    <PageContainer>
      <AppointmentsList initialAppointments={appointments || []} />
    </PageContainer>
  );
}
