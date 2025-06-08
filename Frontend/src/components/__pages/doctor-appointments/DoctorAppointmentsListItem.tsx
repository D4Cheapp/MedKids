'use client';

import { Appointment } from '@/modules/appointments/types';
import { Routes } from 'constants/routes';

import { useRouter } from 'next/navigation';

type Props = {
  appointment: Appointment;
};

export const DoctorAppointmentsListItem = ({ appointment }: Props) => {
  const { push } = useRouter();

  const handleAppointmentClick = () => {
    push(Routes.DoctorAppointments + `/${appointment.patient.patient_id}`);
  };

  return (
    <div
      className="grid grid-cols-3 gap-2 p-4 border-medium border-gray-200 rounded-xl items-center cursor-pointer"
      onClick={handleAppointmentClick}>
      <div>
        <p>{appointment.patient.last_name}</p>
        <p>{appointment.patient.first_name}</p>
        <p>{appointment.patient.middle_name}</p>
      </div>
      <p>{appointment.appointment_date}</p>
      <p>{appointment.start_time}</p>
    </div>
  );
};
