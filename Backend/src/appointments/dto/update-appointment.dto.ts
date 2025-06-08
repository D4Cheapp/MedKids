import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

import { AppointmentStatus } from '../../constants/enums';

export class UpdateAppointmentDto {
  @ApiProperty({ description: 'ID врача', example: 1, required: false })
  @IsInt({ message: 'ID врача должен быть числом' })
  @IsOptional()
  doctorId?: number;

  @ApiProperty({ description: 'ID пациента', example: 1, required: false })
  @IsInt({ message: 'ID пациента должен быть числом' })
  @IsOptional()
  patientId?: number;

  @ApiProperty({ description: 'ID типа приема', example: 1, required: false })
  @IsInt({ message: 'ID типа приема должен быть числом' })
  @IsOptional()
  typeId?: number;

  @ApiProperty({ description: 'ID причины приема', example: 1, required: false })
  @IsInt({ message: 'ID причины приема должен быть числом' })
  @IsOptional()
  reasonId?: number;

  @ApiProperty({ description: 'Дата приема (ГГГГ-ММ-ДД)', example: '2025-06-15', required: false })
  @IsDateString({}, { message: 'Неверный формат даты' })
  @IsOptional()
  appointmentDate?: string;

  @ApiProperty({ description: 'Время начала приема (ЧЧ:ММ:СС)', example: '14:00:00', required: false })
  @IsString({ message: 'Время начала должно быть строкой' })
  @IsOptional()
  startTime?: string;

  @ApiProperty({ description: 'Время окончания приема (ЧЧ:ММ:СС)', example: '14:30:00', required: false })
  @IsString({ message: 'Время окончания должно быть строкой' })
  @IsOptional()
  endTime?: string;

  @ApiProperty({
    description: 'Статус приема',
    enum: Object.values(AppointmentStatus),
    example: 'Запланирован',
    required: false
  })
  @IsEnum(AppointmentStatus, { message: 'Некорректный статус приема' })
  @IsOptional()
  status?: string;

  @ApiProperty({ description: 'Диагноз', required: false })
  @IsString({ message: 'Диагноз должен быть строкой' })
  @IsOptional()
  diagnosis?: string;

  @ApiProperty({ description: 'Рекомендации', required: false })
  @IsString({ message: 'Рекомендации должны быть строкой' })
  @IsOptional()
  recommendations?: string;
}
