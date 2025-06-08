import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppointmentReasonsService } from './appointment-reasons.service';
import { AppointmentReason } from './appointment-reason.entity';
import { CreateAppointmentReasonDto } from './dto/create-appointment-reason.dto';
import { UpdateAppointmentReasonDto } from './dto/update-appointment-reason.dto';

@ApiTags('Причины визитов')
@Controller('appointment-reasons')
export class AppointmentReasonsController {
  constructor(private readonly reasonsService: AppointmentReasonsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новую причину визита' })
  @ApiResponse({ status: 201, description: 'Причина визита успешно создана' })
  create(@Body() createDto: CreateAppointmentReasonDto): Promise<AppointmentReason> {
    return this.reasonsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все причины визитов' })
  @ApiResponse({ status: 200, description: 'Возвращает список всех причин визитов' })
  findAll(): Promise<AppointmentReason[]> {
    return this.reasonsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить причину визита по ID' })
  @ApiResponse({ status: 200, description: 'Возвращает причину визита' })
  @ApiResponse({ status: 404, description: 'Причина визита не найдена' })
  findOne(@Param('id') id: string): Promise<AppointmentReason> {
    return this.reasonsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить причину визита' })
  @ApiResponse({ status: 200, description: 'Причина визита успешно обновлена' })
  @ApiResponse({ status: 404, description: 'Причина визита не найдена' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateAppointmentReasonDto,
  ): Promise<AppointmentReason> {
    return this.reasonsService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить причину визита' })
  @ApiResponse({ status: 200, description: 'Причина визита успешно удалена' })
  @ApiResponse({ status: 404, description: 'Причина визита не найдена' })
  remove(@Param('id') id: string): Promise<void> {
    return this.reasonsService.remove(+id);
  }
}
