import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMedicalRecordDto {
  @IsNumber()
  @IsNotEmpty()
  procedure_type_id: number;

  @IsNumber()
  @IsNotEmpty()
  doctor_id: number;

  @IsNumber()
  @IsNotEmpty()
  patient_id: number;

  @IsString()
  @IsOptional()
  diagnosis?: string;

  @IsString()
  @IsOptional()
  treatment?: string;

  @IsString()
  @IsOptional()
  prescriptions?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
