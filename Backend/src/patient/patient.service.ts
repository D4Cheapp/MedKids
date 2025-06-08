import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Like, Repository } from 'typeorm';

import { AddressDistrict } from '../address_districts/address_districts.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientSearchDto } from './dto/patient-search.dto';
import { Patient } from './patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(AddressDistrict)
    private addressRepository: Repository<AddressDistrict>
  ) {}

  async findOne(id: number) {
    return this.patientRepository.findOne({ where: { patient_id: id } });
  }

  async searchPatients(searchParams: PatientSearchDto): Promise<Patient[]> {
    try {
      const where: any = {};

      if (searchParams.lastName) {
        where.last_name = Like(`%${searchParams.lastName}%`);
      }
      if (searchParams.firstName) {
        where.first_name = Like(`%${searchParams.firstName}%`);
      }
      if (searchParams.middleName) {
        where.middle_name = Like(`%${searchParams.middleName}%`);
      }
      if (searchParams.birthDate) {
        where.birth_date = searchParams.birthDate;
      }

      const patients = await this.patientRepository.find({
        where,
        order: {
          last_name: 'ASC',
          first_name: 'ASC',
          middle_name: 'ASC',
        },
      });

      return patients;
    } catch (error) {
      throw new HttpException('Произошла ошибка при поиске пациентов', error);
    }
  }

  async createPatient(createPatientDto: CreatePatientDto): Promise<Patient> {
    const existingPatient = await this.patientRepository.findOne({
      where: [
        {
          last_name: createPatientDto.lastName,
          first_name: createPatientDto.firstName,
          birth_date: new Date(createPatientDto.birthDate),
        },
      ],
    });
    if (existingPatient) {
      throw new ConflictException('Пациент с такими данными уже существует');
    }

    const address = await this.addressRepository.findOne({
      where: { address_id: createPatientDto.addressId },
    });
    if (!address) {
      throw new NotFoundException('Указанный адрес не найден');
    }

    const patient = this.patientRepository.create({
      last_name: createPatientDto.lastName,
      first_name: createPatientDto.firstName,
      middle_name: createPatientDto.middleName,
      birth_date: new Date(createPatientDto.birthDate),
      phone: createPatientDto.phoneNumber,
      gender: createPatientDto.gender,
      parent_phone: createPatientDto.parentPhone,
      parent_first_name: createPatientDto.firstName,
      parent_last_name: createPatientDto.lastName,
      parent_middle_name: createPatientDto.middleName,
      address: address,
    });

    return this.patientRepository.save(patient);
  }
}
