import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentReason } from './appointment-reason.entity';
import { AppointmentReasonsService } from './appointment-reasons.service';
import { AppointmentReasonsController } from './appointment-reasons.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentReason])],
  controllers: [AppointmentReasonsController],
  providers: [AppointmentReasonsService],
  exports: [AppointmentReasonsService],
})
export class AppointmentReasonsModule {}
