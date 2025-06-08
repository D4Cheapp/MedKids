import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MedicalRecord } from '../medical-records/medical-record.entity';

@Entity('procedure_types')
export class ProcedureType {
  @PrimaryGeneratedColumn()
  procedure_type_id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ default: false })
  is_diagnostic: boolean;

  @OneToMany(() => MedicalRecord, record => record.procedureType)
  medicalRecords: MedicalRecord[];
}
