import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Appointment } from './appointment.entity';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { Doctor } from '../doctors/doctor.entity';
import { Patient } from '../patient/patient.entity';
import { AppointmentType } from '../appointment-types/appointment-type.entity';
import { AppointmentReason } from '../appointment-reasons/appointment-reason.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Appointment,
      Doctor,
      Patient,
      AppointmentType,
      AppointmentReason,
    ]),
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
