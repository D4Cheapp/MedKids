import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { District } from '../districts/district.entity';
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

  @ManyToOne(() => District, (district) => district.district_id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'district_id' })
  district: District;

  @Column()
  office: string;

  @ManyToOne(() => Specialty, (specialty) => specialty.specialty_id, { eager: true })
  @JoinColumn({ name: 'specialty_id' })
  specialty: Specialty;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
