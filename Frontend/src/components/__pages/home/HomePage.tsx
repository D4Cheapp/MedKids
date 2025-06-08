'use client';

import { Button, Card, CardBody, CardHeader } from '@heroui/react';
import { Routes } from 'constants/routes';

import { useRouter } from 'next/navigation';

type Role = 'doctor' | 'registrar';

const HomePage = () => {
  const router = useRouter();

  const handleRoleSelect = (role: Role) => {
    if (role === 'doctor') {
      router.push(Routes.DoctorAppointments);
    } else {
      router.push(Routes.RegistrarPatients);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md py-7">
        <CardHeader className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-center text-gray-800">Добро пожаловать</h1>
          <p className="text-gray-500 text-medium">Выберите вашу роль для продолжения</p>
        </CardHeader>
        <CardBody className="w-full flex flex-row gap-4 justify-center mt-5">
          <Button
            color="primary"
            variant="solid"
            className="w-[40%] py-6 text-lg"
            onPress={() => handleRoleSelect('doctor')}>
            Врач
          </Button>
          <Button
            color="primary"
            variant="solid"
            className="w-[40%] py-6 text-lg"
            onPress={() => handleRoleSelect('registrar')}>
            Регистратор
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default HomePage;
