'use client';

import { Patient } from '@/modules/patients/types';
import { Input } from '@heroui/react';

import { useEffect, useState } from 'react';

import { PatientCard } from './PatientCard';
import { PatientModal } from './PatientModal';

interface PatientsListProps {
  patients: Patient[];
}

export function PatientsList({ patients: initialPatients }: PatientsListProps) {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [searchParams, setSearchParams] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    medicalPolicy: '',
    birthDate: '',
  });

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPatients = patients.filter(patient => {
    return (
      patient.last_name.toLowerCase().includes(searchParams.lastName.toLowerCase()) &&
      patient.first_name.toLowerCase().includes(searchParams.firstName.toLowerCase()) &&
      (searchParams.middleName === '' ||
        patient.middle_name?.toLowerCase().includes(searchParams.middleName.toLowerCase())) &&
      (searchParams.birthDate === '' || patient.birth_date.includes(searchParams.birthDate))
    );
  });

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const lastName = searchParams.get('lastName');
    const firstName = searchParams.get('firstName');
    const middleName = searchParams.get('middleName');
    const medicalPolicy = searchParams.get('medicalPolicy');
    const birthDate = searchParams.get('birthDate');

    setSearchParams({
      lastName: lastName || '',
      firstName: firstName || '',
      middleName: middleName || '',
      medicalPolicy: medicalPolicy || '',
      birthDate: birthDate || '',
    });
  }, []);

  return (
    <>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-4">Поиск пациентов</h2>
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Фамилия"
              name="lastName"
              value={searchParams.lastName}
              onChange={handleInputChange}
            />
            <Input
              label="Имя"
              name="firstName"
              value={searchParams.firstName}
              onChange={handleInputChange}
            />
            <Input
              label="Отчество"
              name="middleName"
              value={searchParams.middleName}
              onChange={handleInputChange}
            />
            <Input
              label="Медицинский полис"
              name="medicalPolicy"
              onChange={handleInputChange}
              className="col-span-2"
            />
            <Input
              type="date"
              label="Дата рождения"
              name="birthDate"
              value={searchParams.birthDate}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-200">
            {filteredPatients.length > 0 ? (
              filteredPatients.map(patient => (
                <PatientCard
                  key={patient.patient_id}
                  patient={patient}
                  onClick={() => handlePatientClick(patient)}
                />
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">Пациенты не найдены</div>
            )}
          </div>
        </div>
      </div>
      {selectedPatient && (
        <PatientModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          patient={selectedPatient}
        />
      )}
    </>
  );
}
