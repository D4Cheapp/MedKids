import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Appointment } from '../appointments/appointment.entity';

@Entity('appointment_reasons')
export class AppointmentReason {
  @PrimaryGeneratedColumn()
  reason_id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Appointment, appointment => appointment.reason)
  appointments: Appointment[];
}
