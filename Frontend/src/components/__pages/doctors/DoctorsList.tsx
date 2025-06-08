'use client';

import { Doctor } from '@/modules/doctors/types';
import { Input } from '@heroui/react';

import { useState } from 'react';

import { DoctorCard } from './DoctorCard';
import { DoctorModal } from './DoctorModal';

interface DoctorsListProps {
  initialDoctors: Doctor[];
}

export function DoctorsList({ initialDoctors }: DoctorsListProps) {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredDoctors = doctors.filter(doctor => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    const fullName = `${doctor.last_name} ${doctor.first_name} ${doctor.middle_name}`.toLowerCase();
    const specialty = doctor.specialty.name.toLowerCase();
    const district = doctor.district.name.toLowerCase();
    const office = doctor.office?.toLowerCase() || '';

    return (
      fullName.includes(searchLower) ||
      specialty.includes(searchLower) ||
      district.includes(searchLower) ||
      office.includes(searchLower) ||
      doctor.phone.includes(searchTerm)
    );
  });

  const handleDoctorClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Врачи</h2>
        </div>
        <div className="mb-6">
          <Input
            label="Поиск врача"
            placeholder="Поиск по ФИО, специальности или району"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map(doctor => (
            <div
              key={doctor.doctor_id}
              onClick={() => handleDoctorClick(doctor)}
              className="cursor-pointer hover:shadow-md transition-shadow h-full">
              <DoctorCard doctor={doctor} />
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-10 text-gray-500">Врачи не найдены</div>
        )}
      </div>

      {selectedDoctor && (
        <DoctorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          doctor={selectedDoctor}
        />
      )}
    </div>
  );
}
