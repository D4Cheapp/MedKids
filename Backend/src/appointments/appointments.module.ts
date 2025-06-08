import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { AppointmentsService } from './appointments.service';
import { DoctorsModule } from '../doctors/doctors.module';
import { PatientModule } from '../patient/patient.module';
import { AppointmentTypesModule } from '../appointment-types/appointment-types.module';
import { AppointmentReasonsModule } from '../appointment-reasons/appointment-reasons.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    DoctorsModule,
    PatientModule,
    AppointmentTypesModule,
    AppointmentReasonsModule,
  ],
  providers: [AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
