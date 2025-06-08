import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AddressDistrict } from '../address_districts/address_districts.entity';
import { GenderType } from '../constants/enums';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn()
  patient_id: number;

  @Column()
  last_name: string;

  @Column()
  first_name: string;

  @Column({ nullable: true })
  middle_name: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @Column({
    type: 'enum',
    enum: GenderType,
    enumName: 'gender_type',
  })
  gender: GenderType;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  parent_last_name: string;

  @Column({ nullable: true })
  parent_first_name: string;

  @Column({ nullable: true })
  parent_middle_name: string;

  @Column()
  parent_phone: string;

  @ManyToOne(() => AddressDistrict, (address) => address.address_id, { eager: true })
  @JoinColumn({ name: 'address_id' })
  address: AddressDistrict;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
