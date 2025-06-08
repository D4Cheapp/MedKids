import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { MedicalRecord } from './medical-record.entity';

@Injectable()
export class MedicalRecordsService {
  constructor(
    @InjectRepository(MedicalRecord)
    private medicalRecordRepository: Repository<MedicalRecord>
  ) {}

  async create(createMedicalRecordDto: CreateMedicalRecordDto): Promise<MedicalRecord> {
    const medicalRecord = this.medicalRecordRepository.create({
      procedureType: { procedure_type_id: createMedicalRecordDto.procedure_type_id },
      doctor: { doctor_id: createMedicalRecordDto.doctor_id },
      patient: { patient_id: createMedicalRecordDto.patient_id },
      diagnosis: createMedicalRecordDto.diagnosis,
      treatment: createMedicalRecordDto.treatment,
      prescriptions: createMedicalRecordDto.prescriptions,
      notes: createMedicalRecordDto.notes,
    });

    return this.medicalRecordRepository.save(medicalRecord);
  }

  async findAllByPatient(patientId: number): Promise<MedicalRecord[]> {
    return this.medicalRecordRepository.find({
      where: { patient: { patient_id: patientId } },
      relations: ['procedureType', 'doctor', 'patient'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(recordId: number): Promise<MedicalRecord> {
    const record = await this.medicalRecordRepository.findOne({
      where: { record_id: recordId },
      relations: ['procedureType', 'doctor', 'patient'],
    });

    if (!record) {
      throw new NotFoundException(`Medical record with ID ${recordId} not found`);
    }

    return record;
  }
}
