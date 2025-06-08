import { MedicalRecord } from '@/modules/medical-records/types';
import { Modal, ModalBody, ModalContent, ModalHeader, Textarea } from '@heroui/react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  record: MedicalRecord;
};

export const PatientRecordModal = ({ isOpen, onClose, record }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl">
      <ModalContent>
        <ModalHeader>Прием пациента {record.created_at.split('T')[0]}</ModalHeader>
        <ModalBody className="flex flex-col pb-10">
          <Textarea label="Диагноз" value={record.diagnosis} disabled />
          <Textarea label="Лечение" value={record.treatment} disabled />
          <Textarea label="Примечания" value={record.notes} disabled />
          <Textarea label="Лекарства" value={record.prescriptions} disabled />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
