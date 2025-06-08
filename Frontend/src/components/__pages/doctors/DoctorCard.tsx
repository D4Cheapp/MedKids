import { Doctor } from '@/modules/doctors/types';

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 h-full">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div>
            <h3 className="text-lg font-semibold">
              {doctor.last_name} {doctor.first_name} {doctor.middle_name}
            </h3>
            <p className="text-primary-600 font-medium">{doctor.specialty.name}</p>
            <p className="text-sm text-gray-600 mt-1">Кабинет: {doctor.office}</p>
            <p className="text-sm text-gray-600">{doctor.is_active ? 'Активен' : 'Неактивен'}</p>
          </div>
        </div>

        {doctor.district && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">Район: {doctor.district.description}</p>
          </div>
        )}
      </div>
    </div>
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
