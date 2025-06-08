import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AddressDistrict } from '../address_districts/address_districts.entity';
import { Doctor } from '../doctors/doctor.entity';

@Entity('districts')
export class District {
  @PrimaryGeneratedColumn()
  district_id: number;

  @Column({ unique: true })
  district_number: number;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Doctor, (doctor) => doctor.district)
  doctors: Doctor[];

  @OneToMany(() => AddressDistrict, (address) => address.district)
  addresses: AddressDistrict[];
}
