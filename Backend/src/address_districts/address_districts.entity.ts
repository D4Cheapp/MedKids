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

import { District } from '../districts/district.entity';
import { Patient } from '../patient/patient.entity';

@Entity('address_districts')
export class AddressDistrict {
  @PrimaryGeneratedColumn()
  address_id: number;

  @Column()
  street: string;

  @Column()
  house: string;

  @Column({ nullable: true })
  apartment: string;

  @ManyToOne(() => District, (district) => district.addresses, { eager: true })
  @JoinColumn({ name: 'district_id' })
  district: District;

  @OneToMany(() => Patient, (patient) => patient.address)
  patients: Patient[];

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
