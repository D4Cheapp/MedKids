import { appointmentsApi } from '@/modules/appointments/api';
import { doctorsApi } from '@/modules/doctors/api';
import { PageContainer } from 'components/PageContainer/PageContainer';
import { AppointmentStatus } from 'constants/appointment-status';
import { DoctorAppointmentsPage } from 'pages/doctor-appointments/DoctorAppointmentsPage';

const Page = async () => {
  const appointments = await appointmentsApi.getAll({
    status: AppointmentStatus.Planned,
    start_date: new Date().toISOString().split('T')[0],
  });
  const doctors = await doctorsApi.getAll();

  return (
    <PageContainer>
      <DoctorAppointmentsPage initAppointments={appointments || []} doctors={doctors || []} />
    </PageContainer>
  );
};

export default Page;
