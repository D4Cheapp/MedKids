import { Patient } from 'src/patient/patient.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Doctor } from '../doctors/doctor.entity';
import { ProcedureType } from '../procedure-types/procedure-type.entity';

@Entity('medical_records')
export class MedicalRecord {
  @PrimaryGeneratedColumn()
  record_id: number;

  @ManyToOne(() => ProcedureType, (procedureType) => procedureType.procedure_type_id, {
    eager: true,
  })
  @JoinColumn({ name: 'procedure_type_id' })
  procedureType: ProcedureType;

  @ManyToOne(() => Doctor, (doctor) => doctor.doctor_id, { eager: true })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @ManyToOne(() => Patient, (patient) => patient.patient_id, { eager: true })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @Column({ nullable: true })
  diagnosis: string;

  @Column({ type: 'text', nullable: true })
  treatment: string;

  @Column({ type: 'text', nullable: true })
  prescriptions: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
