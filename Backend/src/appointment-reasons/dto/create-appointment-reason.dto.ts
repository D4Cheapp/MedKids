import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAppointmentReasonDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
