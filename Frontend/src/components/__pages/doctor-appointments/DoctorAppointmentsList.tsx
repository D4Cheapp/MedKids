import { Appointment } from '@/modules/appointments/types';

import { DoctorAppointmentsListItem } from './DoctorAppointmentsListItem';

type Props = {
  appointments: Appointment[];
};

export const DoctorAppointmentsList = ({ appointments }: Props) => {
  return (
    <>
      <div className="grid grid-cols-3 mt-5 mb-2 p-4">
        <p className="font-bold">Пациент</p>
        <p className="font-bold">Дата</p>
        <p className="font-bold">Время</p>
      </div>
      <div className="flex flex-col gap-4">
        {appointments.map(appointment => (
          <DoctorAppointmentsListItem key={appointment.appointment_id} appointment={appointment} />
        ))}
      </div>
    </>
  );
};
