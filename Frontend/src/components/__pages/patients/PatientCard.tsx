import { Patient } from '@/modules/patients/types';

interface PatientCardProps {
  patient: Patient;
  onClick: () => void;
}

export function PatientCard({ patient, onClick }: PatientCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
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
    <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors" onClick={onClick}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-medium text-gray-900">
            {patient.last_name} {patient.first_name} {patient.middle_name || ''}
          </p>
          <p className="text-sm text-gray-500">
            {formatDate(patient.birth_date)} ({formatAge(patient.birth_date)} лет)
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">
            {patient.parent_last_name} {patient.parent_first_name} {patient.parent_middle_name}
          </p>
          <p className="text-sm text-gray-500">{patient.phone}</p>
        </div>
      </div>
    </div>
  );
}
