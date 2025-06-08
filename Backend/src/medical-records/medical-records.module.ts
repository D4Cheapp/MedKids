import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalRecord } from './medical-record.entity';
import { MedicalRecordsService } from './medical-records.service';
import { ProcedureTypesModule } from '../procedure-types/procedure-types.module';
import { DoctorsModule } from '../doctors/doctors.module';
import { PatientModule } from '../patient/patient.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicalRecord]),
    ProcedureTypesModule,
    DoctorsModule,
    PatientModule,
  ],
  providers: [MedicalRecordsService],
  exports: [MedicalRecordsService],
})
export class MedicalRecordsModule {}
