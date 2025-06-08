import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { AppointmentStatus } from 'src/constants/enums';

import { Appointment } from './appointment.entity';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@ApiTags('Записи на прием')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новую запись на прием' })
  create(@Body() createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список записей на прием' })
  @ApiQuery({ name: 'doctorId', required: false })
  @ApiQuery({ name: 'patientId', required: false })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiQuery({ name: 'status', required: false })
  findAll(
    @Query('doctorId') doctorId?: number,
    @Query('patientId') patientId?: number,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('status') status?: string
  ): Promise<Appointment[]> {
    return this.appointmentsService.findAll(
      doctorId ? Number(doctorId) : undefined,
      patientId ? Number(patientId) : undefined,
      startDate,
      endDate,
      status as AppointmentStatus
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить запись на прием по ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Appointment> {
    return this.appointmentsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить запись на прием' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto
  ): Promise<Appointment> {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить запись на прием' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.appointmentsService.remove(id);
  }

  @Get('doctor/:doctorId/schedule')
  @ApiOperation({ summary: 'Получить расписание врача' })
  getDoctorSchedule(@Param('doctorId') doctorId: number): Promise<Appointment[]> {
    return this.appointmentsService.getDoctorSchedule(doctorId);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Обновить статус записи на прием' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Query('status') status: string,
    @Query('comments') comments?: string
  ): Promise<Appointment> {
    return this.appointmentsService.updateStatus(id, status as AppointmentStatus, comments);
  }
}
