import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';
import { DoctorsService } from './doctors.service';
import { DistrictsModule } from '../districts/districts.module';
import { SpecialtiesModule } from '../specialties/specialties.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor]),
    DistrictsModule,
    SpecialtiesModule,
  ],
  providers: [DoctorsService],
  exports: [DoctorsService],
})
export class DoctorsModule {}
