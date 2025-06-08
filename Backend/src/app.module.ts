import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { AddressDistrict } from './address_districts/address_districts.entity';
import { AddressDistrictsModule } from './address_districts/address_districts.module';
import { AppointmentReason } from './appointment-reasons/appointment-reason.entity';
import { AppointmentReasonsModule } from './appointment-reasons/appointment-reasons.module';
import { AppointmentType } from './appointment-types/appointment-type.entity';
import { AppointmentTypesModule } from './appointment-types/appointment-types.module';
import { Appointment } from './appointments/appointment.entity';
import { AppointmentsModule } from './appointments/appointments.module';
import { District } from './districts/district.entity';
import { DistrictsModule } from './districts/districts.module';
import { Doctor } from './doctors/doctor.entity';
import { DoctorsModule } from './doctors/doctors.module';
import { MedicalRecord } from './medical-records/medical-record.entity';
import { MedicalRecordsModule } from './medical-records/medical-records.module';
import { Patient } from './patient/patient.entity';
import { PatientModule } from './patient/patient.module';
import { ProcedureType } from './procedure-types/procedure-type.entity';
import { ProcedureTypesModule } from './procedure-types/procedure-types.module';
import { SpecialtiesModule } from './specialties/specialties.module';
import { Specialty } from './specialties/specialty.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      entities: [
        Patient,
        AddressDistrict,
        District,
        Specialty,
        ProcedureType,
        AppointmentType,
        AppointmentReason,
        Appointment,
        MedicalRecord,
        Doctor,
      ],
      synchronize: false,
      autoLoadEntities: true,
    }),
    PatientModule,
    AddressDistrictsModule,
    DistrictsModule,
    SpecialtiesModule,
    ProcedureTypesModule,
    DoctorsModule,
    AppointmentTypesModule,
    AppointmentReasonsModule,
    AppointmentsModule,
    MedicalRecordsModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
