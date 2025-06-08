import { MedicalRecord } from '@/modules/medical-records/types';

import { PatientRecordListItem } from './PatientRecordListItem';

type Props = {
  records: MedicalRecord[];
};

export const PatientRecordList = ({ records }: Props) => {
  return (
    <div className="flex flex-col gap-4 mt-10">
      <h2 className="text-2xl font-bold">История приемов</h2>
      <div className="flex flex-col gap-2">
        {records.map(record => (
          <PatientRecordListItem key={record.medical_record_id} record={record} />
        ))}
      </div>
    </div>
  );
};
