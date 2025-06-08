import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentReason } from './appointment-reason.entity';
import { CreateAppointmentReasonDto } from './dto/create-appointment-reason.dto';
import { UpdateAppointmentReasonDto } from './dto/update-appointment-reason.dto';

@Injectable()
export class AppointmentReasonsService {
  constructor(
    @InjectRepository(AppointmentReason)
    private readonly reasonsRepository: Repository<AppointmentReason>,
  ) {}

  async create(createDto: CreateAppointmentReasonDto): Promise<AppointmentReason> {
    const reason = this.reasonsRepository.create(createDto);
    return this.reasonsRepository.save(reason);
  }

  async findAll(): Promise<AppointmentReason[]> {
    return this.reasonsRepository.find();
  }

  async findOne(id: number): Promise<AppointmentReason> {
    const reason = await this.reasonsRepository.findOne({ where: { reason_id: id } });
    if (!reason) {
      throw new NotFoundException(`Причина визита с ID ${id} не найдена`);
    }
    return reason;
  }

  async update(
    id: number, 
    updateDto: UpdateAppointmentReasonDto
  ): Promise<AppointmentReason> {
    const reason = await this.findOne(id);
    return this.reasonsRepository.save({ ...reason, ...updateDto });
  }

  async remove(id: number): Promise<void> {
    const result = await this.reasonsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Причина визита с ID ${id} не найдена`);
    }
  }
}
