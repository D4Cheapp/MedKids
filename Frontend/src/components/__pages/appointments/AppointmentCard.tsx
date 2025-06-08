'use client';

import { Appointment } from '@/modules/appointments/types';
import { Button } from '@heroui/react';
import { AppointmentStatus } from 'constants/appointment-status';

interface AppointmentCardProps {
  appointment: Appointment;
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  };

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.Planned:
        return 'bg-blue-100 text-blue-800';
      case AppointmentStatus.Completed:
        return 'bg-green-100 text-green-800';
      case AppointmentStatus.Cancelled:
        return 'bg-red-100 text-red-800';
      case AppointmentStatus.Missed:
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-medium">
              {appointment.patient.last_name} {appointment.patient.first_name}{' '}
              {appointment.patient.middle_name || ''}
            </h3>
            <span
              className={`text-xs px-2 py-1 rounded-full ${getStatusColor(appointment.status)}`}>
              {appointment.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {appointment.doctor.last_name} {appointment.doctor.first_name[0]}.
            {appointment.doctor.middle_name ? ` ${appointment.doctor.middle_name[0]}.` : ''}
          </p>
          <div className="mt-2 flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {formatDate(appointment.appointment_date)}
            </span>
            <span className="text-sm font-medium">
              {formatTime(appointment.start_time)} - {formatTime(appointment.end_time)}
            </span>
            <span className="text-sm text-gray-500">{appointment.type.name}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="flat" size="sm">
            Подробнее
          </Button>
          {appointment.status === AppointmentStatus.Planned && (
            <Button color="danger" variant="flat" size="sm">
              Отменить
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
