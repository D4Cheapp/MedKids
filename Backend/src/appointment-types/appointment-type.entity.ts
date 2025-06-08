import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Appointment } from '../appointments/appointment.entity';

@Entity('appointment_types')
export class AppointmentType {
  @PrimaryGeneratedColumn()
  type_id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ type: 'interval' })
  duration: string;

  @OneToMany(() => Appointment, appointment => appointment.type)
  appointments: Appointment[];
}
