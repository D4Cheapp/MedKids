import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('procedure_types')
export class ProcedureType {
  @PrimaryGeneratedColumn()
  procedure_type_id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ default: false })
  is_diagnostic: boolean;
}
