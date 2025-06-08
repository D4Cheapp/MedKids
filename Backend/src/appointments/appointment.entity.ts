import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AppointmentReason } from '../appointment-reasons/appointment-reason.entity';
import { AppointmentType } from '../appointment-types/appointment-type.entity';
import { AppointmentStatus } from '../constants/enums';
import { Doctor } from '../doctors/doctor.entity';
import { Patient } from '../patient/patient.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  appointment_id: number;

  @ManyToOne(() => Doctor, (doctor) => doctor.doctor_id, { eager: true })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @ManyToOne(() => Patient, (patient) => patient.patient_id, { eager: true })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @ManyToOne(() => AppointmentType, (type) => type.type_id, { eager: true })
  @JoinColumn({ name: 'type_id' })
  type: AppointmentType;

  @ManyToOne(() => AppointmentReason, (reason) => reason.reason_id, { eager: true })
  @JoinColumn({ name: 'reason_id' })
  reason: AppointmentReason;

  @Column({ type: 'date' })
  appointment_date: Date;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'time' })
  end_time: string;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.SCHEDULED,
  })
  status: AppointmentStatus;

  @Column({ nullable: true })
  diagnosis: string;

  @Column({ type: 'text', nullable: true })
  recommendations: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
