'use client';

import { Doctor } from '@/modules/doctors/types';
import { Button, Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';

export interface DoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor;
}

export function DoctorModal({ isOpen, onClose, doctor }: DoctorModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader className="flex items-center space-x-4">
          <div>
            <h2 className="text-xl font-semibold">
              {doctor.last_name} {doctor.first_name} {doctor.middle_name}
            </h2>
            <p className="text-primary-600">{doctor.specialty.name}</p>
          </div>
        </ModalHeader>
        <ModalBody className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Контактная информация</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-gray-500">Телефон:</span> {doctor.phone}
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Кабинет:</span> {doctor.office}
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Статус:</span>{' '}
                  <span className={doctor.is_active ? 'text-green-600' : 'text-red-600'}>
                    {doctor.is_active ? 'Активен' : 'Неактивен'}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Дополнительно</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-gray-500">Район:</span> {doctor.district.name}
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Специальность:</span> {doctor.specialty.name}
                </p>
              </div>
            </div>
          </div>
        </ModalBody>
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <Button variant="flat" onPress={onClose}>
            Закрыть
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}

function getYearsText(years: number): string {
  const lastDigit = years % 10;
  const lastTwoDigits = years % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'лет';
  }

  if (lastDigit === 1) {
    return 'год';
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'года';
  }

  return 'лет';
}
