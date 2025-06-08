import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAppointmentTypeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'AAA' })
  code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Название типа визита' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '00:15:00' })
  duration: string;
}
