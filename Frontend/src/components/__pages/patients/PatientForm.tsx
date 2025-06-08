'use client';

import { patientsApi } from '@/modules/patients/api';
import { CreatePatientDto } from '@/modules/patients/types';
import { Button, Input, Select, SelectItem } from '@heroui/react';
import { Gender } from 'constants/gender';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

export function PatientForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreatePatientDto & { confirmPhone: string }>({
    last_name: '',
    first_name: '',
    middle_name: '',
    birth_date: '',
    gender: Gender.MALE,
    phone: '',
    parent_last_name: '',
    parent_first_name: '',
    parent_middle_name: '',
    parent_phone: '',
    address_id: 1,
    confirmPhone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.phone !== formData.confirmPhone) {
      setError('Номера телефонов не совпадают');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const { confirmPhone, ...patientData } = formData;
      await patientsApi.create(patientData);

      router.push('/registrar/patients');
    } catch (err) {
      console.error('Failed to create patient:', err);
      setError('Не удалось создать пациента. Пожалуйста, попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold mb-6">Регистрация нового пациента</h1>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            <h2 className="text-lg font-medium text-gray-900 col-span-2">Данные пациента</h2>
            <Input
              label="Фамилия"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
            <Input
              label="Имя"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            <Input
              label="Отчество"
              name="middle_name"
              value={formData.middle_name}
              onChange={handleChange}
            />

            <Select
              label="Пол"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required>
              <SelectItem key={Gender.MALE}>Мужской</SelectItem>
              <SelectItem key={Gender.FEMALE}>Женский</SelectItem>
            </Select>
            <Select
              label="Адрес"
              name="address_id"
              value={formData.address_id}
              onChange={handleChange}
              required>
              <SelectItem key={1}>Мужской</SelectItem>
              <SelectItem key={2}>Женский</SelectItem>
            </Select>
            <Input
              type="tel"
              label="Телефон"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <Input label="Медицинский полис" name="medical_policy" onChange={handleChange} />
            <Input
              type="date"
              label="Дата рождения"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              required
            />
            <h2 className="text-lg font-medium text-gray-900 col-span-2">Данные представителя</h2>
            <Input
              label="Фамилия представителя"
              name="parent_last_name"
              value={formData.parent_last_name}
              onChange={handleChange}
              required
            />
            <Input
              label="Имя представителя"
              name="parent_first_name"
              value={formData.parent_first_name}
              onChange={handleChange}
              required
            />
            <Input
              label="Отчество представителя"
              name="parent_middle_name"
              value={formData.parent_middle_name}
              onChange={handleChange}
            />
            <Input
              type="tel"
              label="Телефон представителя"
              name="parent_phone"
              value={formData.parent_phone}
              onChange={handleChange}
              required
            />

            {/* TODO: Add address selection component */}
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <Button
              variant="flat"
              onPress={() => router.push('/registrar/patients')}
              disabled={isSubmitting}>
              Отмена
            </Button>
            <Button type="submit" color="primary" isLoading={isSubmitting}>
              Зарегистрировать
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
