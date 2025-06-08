import { ApiProperty } from '@nestjs/swagger';

import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { AppointmentStatus } from '../../constants/enums';

export class CreateAppointmentDto {
  @ApiProperty({ description: 'ID врача', example: 1 })
  @IsInt({ message: 'ID врача должен быть числом' })
  @IsNotEmpty({ message: 'ID врача обязателен' })
  doctorId: number;

  @ApiProperty({ description: 'ID пациента', example: 1 })
  @IsInt({ message: 'ID пациента должен быть числом' })
  @IsNotEmpty({ message: 'ID пациента обязателен' })
  patientId: number;

  @ApiProperty({ description: 'ID типа приема', example: 1 })
  @IsInt({ message: 'ID типа приема должен быть числом' })
  @IsNotEmpty({ message: 'Тип приема обязателен' })
  typeId: number;

  @ApiProperty({ description: 'ID причины приема', example: 1 })
  @IsInt({ message: 'ID причины приема должен быть числом' })
  @IsOptional()
  reasonId?: number;

  @ApiProperty({ description: 'Дата приема (ГГГГ-ММ-ДД)', example: '2025-06-15' })
  @IsDateString({}, { message: 'Неверный формат даты' })
  @IsNotEmpty({ message: 'Дата приема обязательна' })
  appointmentDate: string;

  @ApiProperty({ description: 'Время начала приема (ЧЧ:ММ:СС)', example: '14:00:00' })
  @IsString({ message: 'Время начала должно быть строкой' })
  @IsNotEmpty({ message: 'Время начала обязательно' })
  startTime: string;

  @ApiProperty({ description: 'Время окончания приема (ЧЧ:ММ:СС)', example: '14:30:00' })
  @IsString({ message: 'Время окончания должно быть строкой' })
  @IsNotEmpty({ message: 'Время окончания обязательно' })
  endTime: string;

  @ApiProperty({
    description: 'Статус приема',
    enum: Object.values(AppointmentStatus),
    default: 'Запланирован',
    example: 'Запланирован'
  })
  @IsString()
  @IsOptional()
  status?: string = 'Запланирован';

  @ApiProperty({ description: 'Комментарий к приему', required: false })
  @IsString({ message: 'Комментарий должен быть строкой' })
  @IsOptional()
  comments?: string;
}
