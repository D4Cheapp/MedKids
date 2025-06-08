import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Doctor } from './doctor.entity';
import { GetDoctorsDto } from './dto/get-doctors.dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>
  ) {}

  async findAll(filters?: GetDoctorsDto): Promise<Doctor[]> {
    const query = this.doctorsRepository
      .createQueryBuilder('doctor')
      .leftJoinAndSelect('doctor.specialty', 'specialty')
      .leftJoinAndSelect('doctor.district', 'district');

    if (filters) {
      if (filters.search) {
        const searchTerm = `%${filters.search.toLowerCase()}%`;
        query.where(
          '(LOWER(doctor.last_name) LIKE :search OR LOWER(doctor.first_name) LIKE :search OR LOWER(doctor.middle_name) LIKE :search OR doctor.phone LIKE :search)',
          { search: searchTerm }
        );
      }

      if (filters.specialtyId) {
        query.andWhere('doctor.specialty_id = :specialtyId', { specialtyId: filters.specialtyId });
      }

      if (filters.districtId) {
        query.andWhere('doctor.district_id = :districtId', { districtId: filters.districtId });
      }

      if (filters.isActive !== undefined) {
        query.andWhere('doctor.is_active = :isActive', { isActive: filters.isActive });
      }
    }

    if (!filters || Object.keys(filters).length === 0) {
      query.where('doctor.is_active = :isActive', { isActive: true });
    }

    query.orderBy('doctor.last_name', 'ASC').addOrderBy('doctor.first_name', 'ASC');

    return query.getMany();
  }

  async findOne(id: number): Promise<Doctor> {
    const doctor = await this.doctorsRepository.findOne({
      where: { doctor_id: id },
      relations: ['specialty', 'district'],
    });

    if (!doctor) {
      throw new Error(`Doctor with ID ${id} not found`);
    }

    return doctor;
  }
}
