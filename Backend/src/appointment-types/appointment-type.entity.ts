import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
