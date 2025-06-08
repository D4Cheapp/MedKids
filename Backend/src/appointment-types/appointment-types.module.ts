import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentType } from './appointment-type.entity';
import { AppointmentTypesService } from './appointment-types.service';
import { AppointmentTypesController } from './appointment-types.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentType])],
  controllers: [AppointmentTypesController],
  providers: [AppointmentTypesService],
  exports: [AppointmentTypesService],
})
export class AppointmentTypesModule {}
