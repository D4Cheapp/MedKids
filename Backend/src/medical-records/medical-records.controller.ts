import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { MedicalRecord } from './medical-record.entity';
import { MedicalRecordsService } from './medical-records.service';

@ApiTags('Медицинские записи')
@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новую медицинскую запись' })
  @ApiResponse({ status: 201, description: 'Медицинская запись создана успешно.' })
  @ApiResponse({ status: 400, description: 'Неверный запрос.' })
  async create(@Body() createMedicalRecordDto: CreateMedicalRecordDto): Promise<MedicalRecord> {
    return this.medicalRecordsService.create(createMedicalRecordDto);
  }

  @Get('patient/:patientId')
  @ApiOperation({ summary: 'Получить все медицинские записи пациента' })
  @ApiResponse({
    status: 200,
    description: 'Возвращает все медицинские записи для указанного пациента.',
  })
  async findAllByPatient(
    @Param('patientId', ParseIntPipe) patientId: number
  ): Promise<MedicalRecord[]> {
    return this.medicalRecordsService.findAllByPatient(patientId);
  }

  @Get(':recordId')
  @ApiOperation({ summary: 'Получить медицинскую запись по ID' })
  @ApiResponse({ status: 200, description: 'Возвращает запрошенную медицинскую запись.' })
  @ApiResponse({ status: 404, description: 'Медицинская запись не найдена.' })
  async findOne(@Param('recordId', ParseIntPipe) recordId: number): Promise<MedicalRecord> {
    return this.medicalRecordsService.findOne(recordId);
  }
}
