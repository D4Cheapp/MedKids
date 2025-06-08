import { IsDateString, IsOptional, IsString } from 'class-validator';

export class PatientSearchDto {
  @IsOptional()
  @IsString({ message: 'Фамилия должна быть строкой' })
  lastName?: string;

  @IsOptional()
  @IsString({ message: 'Имя должно быть строкой' })
  firstName?: string;

  @IsOptional()
  @IsString({ message: 'Отчество должно быть строкой' })
  middleName?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Неверный формат даты рождения' })
  birthDate?: Date;
}
