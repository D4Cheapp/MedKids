import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientSearchDto } from './dto/patient-search.dto';
import { Patient } from './patient.entity';
import { PatientService } from './patient.service';

@ApiTags('Пациенты')
@Controller('patients')
@ApiExtraModels(Patient)
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Получить пациента по ID' })
  @ApiResponse({ status: 200, description: 'Возвращает запрошенного пациента.' })
  @ApiResponse({ status: 404, description: 'Пациент не найден.' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Patient | null> {
    return this.patientService.findOne(id);
  }

  @Get()
  @ApiOperation({
    summary: 'Поиск пациентов',
    description: 'Поиск пациентов по различным критериям. Все параметры являются необязательными.',
  })
  @ApiQuery({ name: 'lastName', required: false })
  @ApiQuery({ name: 'firstName', required: false })
  @ApiQuery({ name: 'middleName', required: false })
  @ApiQuery({ name: 'birthDate', required: false })
  async searchPatients(@Query() searchParams: PatientSearchDto): Promise<Patient[]> {
    return this.patientService.searchPatients(searchParams);
  }

  @Post()
  @ApiOperation({ summary: 'Создать нового пациента' })
  async createPatient(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    return this.patientService.createPatient(createPatientDto);
  }
}
