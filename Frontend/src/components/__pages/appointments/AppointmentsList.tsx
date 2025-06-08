'use client';

import { Appointment } from '@/modules/appointments/types';
import { Button, Input, Select, SelectItem } from '@heroui/react';
import { AppointmentStatus } from 'constants/appointment-status';

import { useState } from 'react';

import { AppointmentCard } from './AppointmentCard';
import { CreateAppointmentModal } from './CreateAppointmentModal';

interface AppointmentsListProps {
  initialAppointments: Appointment[];
}

export function AppointmentsList({ initialAppointments }: AppointmentsListProps) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [searchParams, setSearchParams] = useState({
    patientName: '',
    doctorName: '',
    status: '',
    date: '',
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredAppointments = appointments.filter(appointment => {
    return (
      `${appointment.patient.last_name} ${appointment.patient.first_name} ${appointment.patient.middle_name || ''}`
        .toLowerCase()
        .includes(searchParams.patientName.toLowerCase()) &&
      `${appointment.doctor.last_name} ${appointment.doctor.first_name} ${appointment.doctor.middle_name || ''}`
        .toLowerCase()
        .includes(searchParams.doctorName.toLowerCase()) &&
      (searchParams.status === '' || appointment.status === searchParams.status) &&
      (searchParams.date === '' || appointment.appointment_date === searchParams.date)
    );
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAppointmentCreated = (newAppointment: Appointment) => {
    setAppointments(prev => [newAppointment, ...prev]);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Записи на прием</h2>
          <Button
            color="primary"
            onPress={() => setIsCreateModalOpen(true)}
            className="whitespace-nowrap">
            + Новая запись
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Input
            label="Пациент"
            name="patientName"
            placeholder="ФИО пациента"
            value={searchParams.patientName}
            onChange={handleInputChange}
          />
          <Input
            label="Врач"
            name="doctorName"
            placeholder="ФИО врача"
            value={searchParams.doctorName}
            onChange={handleInputChange}
          />
          <Select
            label="Статус"
            name="status"
            value={searchParams.status}
            onChange={handleInputChange}>
            {Object.values(AppointmentStatus).map(status => (
              <SelectItem key={status}>{status}</SelectItem>
            ))}
          </Select>
          <Input
            type="date"
            label="Дата приема"
            name="date"
            value={searchParams.date}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map(appointment => (
              <AppointmentCard key={appointment.appointment_id} appointment={appointment} />
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">Записи не найдены</div>
          )}
        </div>
      </div>
      <CreateAppointmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAppointmentCreated={handleAppointmentCreated}
      />
    </div>
  );
}
