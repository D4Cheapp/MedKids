import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAppointmentReasonDto {
  @IsString()
  @ApiProperty({ example: 'AAA' })
  @IsNotEmpty()
  code: string;

  @IsString()
  @ApiProperty({ example: 'Описание' })
  @IsNotEmpty()
  description: string;
}
