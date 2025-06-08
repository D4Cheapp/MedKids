import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Doctor } from './doctor.entity';
import { DoctorsService } from './doctors.service';
import { GetDoctorsDto } from './dto/get-doctors.dto';

@ApiTags('Врачи')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список врачей' })
  @ApiResponse({ status: 200, description: 'Возвращает список врачей с возможностью фильтрации.' })
  @ApiQuery({ name: 'search', required: false, description: 'Поиск по ФИО или телефону' })
  @ApiQuery({ name: 'specialtyId', required: false, description: 'ID специализации' })
  @ApiQuery({ name: 'districtId', required: false, description: 'ID района' })
  @ApiQuery({ name: 'isActive', required: false, description: 'Фильтр по активности (true/false)' })
  async findAll(@Query() filters?: GetDoctorsDto): Promise<Doctor[]> {
    return this.doctorsService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить врача по ID' })
  @ApiResponse({ status: 200, description: 'Возвращает данные врача по указанному ID.' })
  @ApiResponse({ status: 404, description: 'Врач не найден.' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Doctor> {
    return this.doctorsService.findOne(id);
  }
}
