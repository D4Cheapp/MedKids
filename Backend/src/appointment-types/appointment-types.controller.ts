import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppointmentTypesService } from './appointment-types.service';
import { AppointmentType } from './appointment-type.entity';
import { CreateAppointmentTypeDto } from './dto/create-appointment-type.dto';
import { UpdateAppointmentTypeDto } from './dto/update-appointment-type.dto';

@ApiTags('Типы приемов')
@Controller('appointment-types')
export class AppointmentTypesController {
  constructor(private readonly typesService: AppointmentTypesService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый тип приема' })
  @ApiResponse({ status: 201, description: 'Тип приема успешно создан' })
  create(@Body() createDto: CreateAppointmentTypeDto): Promise<AppointmentType> {
    return this.typesService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все типы приемов' })
  @ApiResponse({ status: 200, description: 'Возвращает список всех типов приемов' })
  findAll(): Promise<AppointmentType[]> {
    return this.typesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить тип приема по ID' })
  @ApiResponse({ status: 200, description: 'Возвращает тип приема' })
  @ApiResponse({ status: 404, description: 'Тип приема не найден' })
  findOne(@Param('id') id: string): Promise<AppointmentType> {
    return this.typesService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить тип приема' })
  @ApiResponse({ status: 200, description: 'Тип приема успешно обновлен' })
  @ApiResponse({ status: 404, description: 'Тип приема не найден' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateAppointmentTypeDto,
  ): Promise<AppointmentType> {
    return this.typesService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить тип приема' })
  @ApiResponse({ status: 200, description: 'Тип приема успешно удален' })
  @ApiResponse({ status: 404, description: 'Тип приема не найден' })
  remove(@Param('id') id: string): Promise<void> {
    return this.typesService.remove(+id);
  }
}
