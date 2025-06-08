import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressDistrict } from '../address_districts/address_districts.entity';
import { PatientController } from './patient.controller';
import { Patient } from './patient.entity';
import { PatientService } from './patient.service';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, AddressDistrict])],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {}
