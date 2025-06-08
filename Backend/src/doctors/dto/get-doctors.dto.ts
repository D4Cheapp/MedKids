import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetDoctorsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  specialtyId?: number;

  @IsOptional()
  @IsNumber()
  districtId?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
