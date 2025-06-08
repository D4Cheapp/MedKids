import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentReason } from './appointment-reason.entity';
import { AppointmentReasonsService } from './appointment-reasons.service';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentReason])],
  providers: [AppointmentReasonsService],
  exports: [AppointmentReasonsService],
})
export class AppointmentReasonsModule {}
