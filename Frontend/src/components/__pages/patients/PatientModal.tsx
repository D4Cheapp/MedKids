import { Patient } from '@/modules/patients/types';
import { Button, Modal, ModalContent, ModalHeader } from '@heroui/react';
import { Gender } from 'constants/gender';
import { Routes } from 'constants/routes';

import Link from 'next/link';

interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient;
}

export function PatientModal({ isOpen, onClose, patient }: PatientModalProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatAge = (birthDate: string) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Информация о пациенте" size="5xl">
      <ModalContent className="p-6 space-y-6">
        <ModalHeader>Данные пациента</ModalHeader>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">ФИО</p>
              <p className="font-medium">
                {patient.last_name} {patient.first_name} {patient.middle_name || ''}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Дата рождения</p>
              <p className="font-medium">
                {formatDate(patient.birth_date)} ({formatAge(patient.birth_date)} лет)
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Пол</p>
              <p className="font-medium">
                {patient.gender === Gender.MALE ? 'Мужской' : 'Женский'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Телефон</p>
              <p className="font-medium">{patient.phone}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Данные представителя</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">ФИО</p>
              <p className="font-medium">
                {patient.parent_last_name} {patient.parent_first_name} {patient.parent_middle_name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Телефон</p>
              <p className="font-medium">{patient.parent_phone}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Системная информация</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">ID пациента</p>
              <p className="font-mono">{patient.patient_id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Дата создания</p>
              <p className="font-medium">{new Date(patient.created_at).toLocaleString('ru-RU')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Дата обновления</p>
              <p className="font-medium">{new Date(patient.updated_at).toLocaleString('ru-RU')}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <Button variant="flat" onPress={onClose}>
            Закрыть
          </Button>
          <Button
            as={Link}
            href={Routes.RegistrarPatientsAddAppointment.replace(
              ':id',
              patient.patient_id.toString()
            )}
            color="primary">
            Записать на прием
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}
