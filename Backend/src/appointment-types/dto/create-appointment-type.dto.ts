import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAppointmentTypeDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  duration: string; // Format: 'HH:MM:SS'
}
