import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GenderType } from '../../constants/enums';

export class CreatePatientDto {
  @ApiProperty({ description: 'Фамилия пациента', example: 'Иванов' })
  @IsString({ message: 'Фамилия должна быть строкой' })
  @IsNotEmpty({ message: 'Фамилия обязательна для заполнения' })
  @MinLength(2, { message: 'Фамилия должна содержать минимум 2 символа' })
  @MaxLength(50, { message: 'Фамилия не должна превышать 50 символов' })
  lastName: string;

  @ApiProperty({ description: 'Имя пациента', example: 'Иван' })
  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя обязательно для заполнения' })
  @MinLength(2, { message: 'Имя должно содержать минимум 2 символа' })
  @MaxLength(50, { message: 'Имя не должно превышать 50 символов' })
  firstName: string;

  @ApiProperty({ 
    required: false, 
    description: 'Отчество пациента', 
    example: 'Иванович' 
  })
  @IsString({ message: 'Отчество должно быть строкой' })
  @IsOptional()
  @MaxLength(50, { message: 'Отчество не должно превышать 50 символов' })
  middleName?: string;

  @ApiProperty({ 
    description: 'Пол пациента',
    enum: GenderType,
    enumName: 'GenderType',
    example: GenderType.MALE
  })
  @IsEnum(GenderType, { message: 'Неверное значение пола' })
  @IsNotEmpty({ message: 'Пол обязателен для заполнения' })
  gender: GenderType;

  @ApiProperty({ 
    description: 'Дата рождения пациента', 
    example: '2000-01-01',
    type: 'string',
    format: 'date'
  })
  @IsDateString({}, { message: 'Неверный формат даты рождения. Используйте формат YYYY-MM-DD' })
  @IsNotEmpty({ message: 'Дата рождения обязательна для заполнения' })
  birthDate: string;

  @ApiProperty({ 
    required: false, 
    description: 'Номер телефона', 
    example: '+79001234567' 
  })
  @IsString({ message: 'Номер телефона должен быть строкой' })
  @IsOptional()
  @MaxLength(20, { message: 'Номер телефона не должен превышать 20 символов' })
  phoneNumber?: string;

  @ApiProperty({ 
    required: false, 
    description: 'Электронная почта', 
    example: 'patient@example.com' 
  })
  @IsString({ message: 'Email должен быть строкой' })
  @IsOptional()
  @MaxLength(100, { message: 'Email не должен превышать 100 символов' })
  email?: string;

  @ApiProperty({ 
    description: 'Телефон родителя', 
    example: '+79001234567',
    required: true
  })
  @IsString({ message: 'Телефон родителя должен быть строкой' })
  @IsNotEmpty({ message: 'Телефон родителя обязателен для заполнения' })
  @MaxLength(20, { message: 'Телефон родителя не должен превышать 20 символов' })
  parentPhone: string;

  @ApiProperty({ 
    description: 'ID адреса', 
    example: 1,
    required: true
  })
  @IsNumber({}, { message: 'ID адреса должен быть числом' })
  @IsNotEmpty({ message: 'ID адреса обязателен для заполнения' })
  addressId: number;
}
