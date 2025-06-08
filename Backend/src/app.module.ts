import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

// Core modules
import { AddressDistrictsModule } from './address_districts/address_districts.module';
import { PatientModule } from './patient/patient.module';

// Feature modules
import { DistrictsModule } from './districts/districts.module';
import { SpecialtiesModule } from './specialties/specialties.module';
import { ProcedureTypesModule } from './procedure-types/procedure-types.module';
import { DoctorsModule } from './doctors/doctors.module';
import { AppointmentTypesModule } from './appointment-types/appointment-types.module';
import { AppointmentReasonsModule } from './appointment-reasons/appointment-reasons.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { MedicalRecordsModule } from './medical-records/medical-records.module';

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
      entities: [],
      synchronize: false,
      autoLoadEntities: true,
    }),
    // Core modules
    PatientModule,
    AddressDistrictsModule,
    
    // Feature modules
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
