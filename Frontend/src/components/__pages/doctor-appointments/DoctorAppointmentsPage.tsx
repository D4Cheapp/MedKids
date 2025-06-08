'use client';

import { appointmentsApi } from '@/modules/appointments/api';
import { Appointment } from '@/modules/appointments/types';
import { Doctor } from '@/modules/doctors/types';
import { Select, SelectItem } from '@heroui/react';

import { useEffect, useState } from 'react';

import { DoctorAppointmentsList } from './DoctorAppointmentsList';

type Props = {
  doctors: Doctor[];
  initAppointments: Appointment[];
};

export const DoctorAppointmentsPage = ({ doctors, initAppointments }: Props) => {
  const [appointments, setAppointments] = useState<Appointment[]>(initAppointments);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);

  const handleGetDoctorAppointments = async () => {
    if (!selectedDoctorId) return;
    const doctorAppointments = await appointmentsApi.getAll({
      doctor_id: selectedDoctorId,
    });
    setAppointments(doctorAppointments || []);
  };

  useEffect(() => {
    handleGetDoctorAppointments();
  }, [selectedDoctorId]);

  return (
    <section>
      <h1 className="text-3xl font-bold mt-7 mb-10">Записи на прием</h1>
      <Select
        label="Выберите врача"
        variant="bordered"
        onChange={value => setSelectedDoctorId(Number(value))}>
        {doctors.map(doctor => (
          <SelectItem key={doctor.doctor_id}>
            {`${doctor.specialty.name} — ${doctor.first_name} ${doctor.last_name}`}
          </SelectItem>
        ))}
      </Select>
      <DoctorAppointmentsList appointments={appointments} />
    </section>
  );
};
