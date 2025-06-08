'use client';

import { appointmentsApi } from '@/modules/appointments/api';
import { CreateAppointmentDto } from '@/modules/appointments/types';
import { doctorsApi } from '@/modules/doctors/api';
import { patientsApi } from '@/modules/patients/api';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from '@heroui/react';

import { useEffect, useState } from 'react';

interface CreateAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAppointmentCreated: (appointment: any) => void;
}

export function CreateAppointmentModal({
  isOpen,
  onClose,
  onAppointmentCreated,
}: CreateAppointmentModalProps) {
  const [formData, setFormData] = useState<CreateAppointmentDto>({
    doctor_id: 0,
    patient_id: 0,
    type_id: 0,
    reason_id: 0,
    appointment_date: '',
    start_time: '',
    end_time: '',
    comments: '',
  });

  const [doctors, setDoctors] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [appointmentTypes, setAppointmentTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [doctorsRes, patientsRes, typesRes] = await Promise.all([
          doctorsApi.getAll({}),
          patientsApi.search(),
          appointmentsApi.getAll({}),
        ]);

        setDoctors(doctorsRes || []);
        setPatients(patientsRes || []);
        setAppointmentTypes(typesRes || []);
      } catch (err) {
        setError('Не удалось загрузить данные');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.doctor_id ||
      !formData.patient_id ||
      !formData.type_id ||
      !formData.appointment_date ||
      !formData.start_time ||
      !formData.end_time
    ) {
      setError('Пожалуйста, заполните все обязательные поля');
      return;
    }

    try {
      setLoading(true);
      const newAppointment = await appointmentsApi.create(formData);
      onAppointmentCreated(newAppointment);
      onClose();
    } catch (err) {
      setError('Не удалось создать запись');
      console.error('Error creating appointment:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>Новая запись на прием</ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody className="space-y-4">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Врач"
                name="doctor_id"
                value={formData.doctor_id}
                onChange={handleInputChange}
                required
                disabled={loading}>
                {doctors.map(doctor => (
                  <SelectItem key={doctor.doctor_id}>
                    {`${doctor.last_name} ${doctor.first_name} ${doctor.middle_name || ''}`}
                  </SelectItem>
                ))}
              </Select>

              <Select
                label="Пациент"
                name="patient_id"
                value={formData.patient_id}
                onChange={handleInputChange}
                required
                disabled={loading}>
                {patients.map(patient => (
                  <SelectItem key={patient.patient_id}>
                    {`${patient.last_name} ${patient.first_name} ${patient.middle_name || ''}`}
                  </SelectItem>
                ))}
              </Select>

              <Select
                label="Тип приема"
                name="type_id"
                value={formData.type_id}
                onChange={handleInputChange}
                required
                disabled={loading}>
                {appointmentTypes.map(type => (
                  <SelectItem key={type.appointment_type_id}>
                    {type.name} ({type.duration} мин.)
                  </SelectItem>
                ))}
              </Select>

              <Input
                type="date"
                label="Дата приема"
                name="appointment_date"
                value={formData.appointment_date}
                onChange={handleInputChange}
                required
                disabled={loading}
              />

              <Input
                type="time"
                label="Время начала"
                name="start_time"
                value={formData.start_time}
                onChange={handleInputChange}
                required
                disabled={loading}
              />

              <Input
                type="time"
                label="Время окончания"
                name="end_time"
                value={formData.end_time}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
            <Input
              label="Комментарий"
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              disabled={loading}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose} disabled={loading}>
              Отмена
            </Button>
            <Button color="primary" type="submit" isLoading={loading}>
              Создать запись
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
