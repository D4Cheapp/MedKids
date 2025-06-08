import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentType } from './appointment-type.entity';
import { CreateAppointmentTypeDto } from './dto/create-appointment-type.dto';
import { UpdateAppointmentTypeDto } from './dto/update-appointment-type.dto';

@Injectable()
export class AppointmentTypesService {
  constructor(
    @InjectRepository(AppointmentType)
    private readonly typesRepository: Repository<AppointmentType>,
  ) {}

  async create(createDto: CreateAppointmentTypeDto): Promise<AppointmentType> {
    const type = this.typesRepository.create(createDto);
    return this.typesRepository.save(type);
  }

  async findAll(): Promise<AppointmentType[]> {
    return this.typesRepository.find();
  }

  async findOne(id: number): Promise<AppointmentType> {
    const type = await this.typesRepository.findOne({ where: { type_id: id } });
    if (!type) {
      throw new NotFoundException(`Тип приема с ID ${id} не найден`);
    }
    return type;
  }

  async update(
    id: number, 
    updateDto: UpdateAppointmentTypeDto
  ): Promise<AppointmentType> {
    const type = await this.findOne(id);
    return this.typesRepository.save({ ...type, ...updateDto });
  }

  async remove(id: number): Promise<void> {
    const result = await this.typesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Тип приема с ID ${id} не найден`);
    }
  }
}
