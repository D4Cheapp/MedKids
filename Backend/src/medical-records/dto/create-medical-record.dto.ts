import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMedicalRecordDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  procedure_type_id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  doctor_id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  patient_id: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Diagnosis' })
  diagnosis?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Treatment' })
  treatment?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Prescriptions' })
  prescriptions?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Notes' })
  notes?: string;
}
