import { IsDateString, IsIn, IsInt, IsOptional, Min } from 'class-validator';

export class GetMedicalRecordsDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Min(10)
  limit?: number = 10;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsIn(['created_at', 'updated_at'], {
    message: 'Sort field must be either created_at or updated_at',
  })
  sortBy?: 'created_at' | 'updated_at' = 'created_at';

  @IsOptional()
  @IsIn(['ASC', 'DESC'], {
    message: 'Sort order must be either ASC or DESC',
  })
  sortOrder?: 'ASC' | 'DESC' = 'DESC';

  @IsOptional()
  @IsInt()
  procedureTypeId?: number;

  @IsOptional()
  @IsInt()
  doctorId?: number;
}
