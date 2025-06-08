import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Appointment } from '../appointments/appointment.entity';
import { District } from '../districts/district.entity';
import { MedicalRecord } from '../medical-records/medical-record.entity';
import { Specialty } from '../specialties/specialty.entity';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn()
  doctor_id: number;

  @Column()
  last_name: string;

  @Column()
  first_name: string;

  @Column({ nullable: true })
  middle_name: string;

  @Column({ nullable: true })
  phone: string;

  @ManyToOne(() => District, (district) => district.doctors, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'district_id' })
  district: District;

  @Column()
  office: string;

  @ManyToOne(() => Specialty, (specialty) => specialty.doctors, { eager: true })
  @JoinColumn({ name: 'specialty_id' })
  specialty: Specialty;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];

  @OneToMany(() => MedicalRecord, (record) => record.doctor)
  medicalRecords: MedicalRecord[];
}
