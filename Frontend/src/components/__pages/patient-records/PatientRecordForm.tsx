'use client';

import { AppointmentType } from '@/modules/appointment-types/types';
import { Doctor } from '@/modules/doctors/types';
import { medicalRecordsApi } from '@/modules/medical-records/api';
import { CreateMedicalRecordDto } from '@/modules/medical-records/types';
import { Patient } from '@/modules/patients/types';
import { Button, Select, SelectItem, Textarea } from '@heroui/react';
import { useForm } from 'react-hook-form';

import { useState } from 'react';

type FormData = Omit<CreateMedicalRecordDto, 'patient_id'>;

type Props = {
  patient: Patient;
  onSuccess?: () => void;
  procedures: AppointmentType[];
  doctors: Doctor[];
};

export const PatientRecordForm = ({ patient, onSuccess, procedures, doctors }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      diagnosis: '',
      treatment: '',
      prescriptions: '',
      notes: '',
      procedure_type_id: 0,
      doctor_id: 0,
    },
  });

  const validateRequired = (value: string) => {
    return value.trim().length > 0 || 'Поле обязательно для заполнения';
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      await medicalRecordsApi.create({
        patient_id: patient.patient_id,
        ...data,
      });

      reset();
      onSuccess?.();
    } catch (error) {
      console.error('Error creating medical record:', error);
      alert('Не удалось создать запись о приеме');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full  p-5">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-5">
        <Select label="Процедура" variant="bordered" {...register('procedure_type_id')}>
          {procedures.map(procedure => (
            <SelectItem key={procedure.type_id}>{procedure.name}</SelectItem>
          ))}
        </Select>
        <Select label="Врач" variant="bordered" {...register('doctor_id')}>
          {doctors.map(doctor => (
            <SelectItem key={doctor.doctor_id}>
              {`${doctor.specialty.name} — ${doctor.first_name} ${doctor.last_name}`}
            </SelectItem>
          ))}
        </Select>
        <Textarea
          label="Диагноз"
          variant="bordered"
          placeholder="Введите диагноз"
          {...register('diagnosis', {
            validate: validateRequired,
          })}
          isInvalid={!!errors.diagnosis}
        />
        <Textarea
          label="Лечение"
          variant="bordered"
          placeholder="Введите лечение"
          {...register('treatment', {
            validate: validateRequired,
          })}
          isInvalid={!!errors.treatment}
        />
        <Textarea
          label="Примечания"
          variant="bordered"
          placeholder="Введите примечания"
          {...register('notes')}
          isInvalid={!!errors.notes}
        />
        <Textarea
          label="Лекарства"
          {...register('prescriptions', {
            validate: validateRequired,
          })}
          variant="bordered"
          placeholder="Введите назначения"
          isInvalid={!!errors.prescriptions}
        />
        <Button
          type="submit"
          variant="solid"
          color="primary"
          className="mt-5 col-span-2"
          isLoading={isSubmitting}
          disabled={isSubmitting}>
          {isSubmitting ? 'Сохранение...' : 'Сохранить запись'}
        </Button>
      </form>
    </div>
  );
};
