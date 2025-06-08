import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentType } from './appointment-type.entity';
import { AppointmentTypesService } from './appointment-types.service';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentType])],
  providers: [AppointmentTypesService],
  exports: [AppointmentTypesService],
})
export class AppointmentTypesModule {}
