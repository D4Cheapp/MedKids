'use client';

import { MedicalRecord } from '@/modules/medical-records/types';

import { useState } from 'react';

import { PatientRecordModal } from './PatientRecordModal';

type Props = {
  record: MedicalRecord;
};

export const PatientRecordListItem = ({ record }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="flex justify-between gap-2 p-4 border-medium border-gray-200 rounded-xl cursor-pointer"
        onClick={() => setIsOpen(true)}>
        <p>{record.diagnosis}</p>
        <p>{record.created_at.split('T')[0]}</p>
      </div>
      <PatientRecordModal record={record} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
