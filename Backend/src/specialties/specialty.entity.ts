import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('specialties')
export class Specialty {
  @PrimaryGeneratedColumn()
  specialty_id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;
}
