import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Doctor } from '../doctors/doctor.entity';

@Entity('specialties')
export class Specialty {
  @PrimaryGeneratedColumn()
  specialty_id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Doctor, doctor => doctor.specialty)
  doctors: Doctor[];
}
