import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Between, Not, Repository } from 'typeorm';

import { AppointmentReason } from '../appointment-reasons/appointment-reason.entity';
import { AppointmentType } from '../appointment-types/appointment-type.entity';
import { AppointmentStatus } from '../constants/enums';
import { Doctor } from '../doctors/doctor.entity';
import { Patient } from '../patient/patient.entity';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(AppointmentType)
    private typeRepository: Repository<AppointmentType>,
    @InjectRepository(AppointmentReason)
    private reasonRepository: Repository<AppointmentReason>
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const doctor = await this.doctorRepository.findOne({
      where: { doctor_id: createAppointmentDto.doctorId },
    });
    if (!doctor) {
      throw new NotFoundException('Врач не найден');
    }

    const patient = await this.patientRepository.findOne({
      where: { patient_id: createAppointmentDto.patientId },
    });
    if (!patient) {
      throw new NotFoundException('Пациент не найден');
    }

    const type = await this.typeRepository.findOne({
      where: { type_id: createAppointmentDto.typeId },
    });
    if (!type) {
      throw new NotFoundException('Тип приема не найден');
    }

    let reason: AppointmentReason | null = null;
    if (createAppointmentDto.reasonId) {
      reason = await this.reasonRepository.findOne({
        where: { reason_id: createAppointmentDto.reasonId },
      });
      if (!reason) {
        throw new NotFoundException('Причина приема не найдена');
      }
    }

    const appointmentDate = new Date(createAppointmentDto.appointmentDate);
    const existingAppointment = await this.appointmentRepository.findOne({
      where: {
        doctor: { doctor_id: createAppointmentDto.doctorId },
        appointment_date: appointmentDate,
        start_time: createAppointmentDto.startTime,
      },
    });

    if (existingAppointment) {
      throw new ConflictException('Это время уже занято');
    }

    const appointment = this.appointmentRepository.create({
      doctor,
      patient,
      type,
      reason: reason || undefined,
      appointment_date: appointmentDate,
      start_time: createAppointmentDto.startTime,
      end_time: createAppointmentDto.endTime,
      status: createAppointmentDto.status || AppointmentStatus.SCHEDULED,
      diagnosis: null,
      recommendations: null,
    } as unknown as Appointment);

    return this.appointmentRepository.save(appointment);
  }

  async findAll(
    doctorId?: number,
    patientId?: number,
    startDate?: string,
    endDate?: string,
    status?: AppointmentStatus
  ): Promise<Appointment[]> {
    const where: any = {};

    if (doctorId) {
      where.doctor = { doctor_id: doctorId };
    }

    if (patientId) {
      where.patient = { patient_id: patientId };
    }

    if (status) {
      where.status = status;
    }

    if (startDate && endDate) {
      where.appointment_date = Between(new Date(startDate), new Date(endDate));
    } else if (startDate) {
      where.appointment_date = new Date(startDate);
    }

    return this.appointmentRepository.find({
      where,
      relations: ['doctor', 'patient', 'type', 'reason'],
      order: { appointment_date: 'ASC', start_time: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { appointment_id: id },
      relations: ['doctor', 'patient', 'type', 'reason'],
    });

    if (!appointment) {
      throw new NotFoundException('Прием не найден');
    }

    return appointment;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.findOne(id);
    const updates: Partial<Appointment> = {};

    if (updateAppointmentDto.doctorId !== undefined) {
      const doctor = await this.doctorRepository.findOne({
        where: { doctor_id: updateAppointmentDto.doctorId },
      });
      if (!doctor) {
        throw new NotFoundException('Врач не найден');
      }
      updates.doctor = doctor;
    }

    if (updateAppointmentDto.patientId !== undefined) {
      const patient = await this.patientRepository.findOne({
        where: { patient_id: updateAppointmentDto.patientId },
      });
      if (!patient) {
        throw new NotFoundException('Пациент не найден');
      }
      updates.patient = patient;
    }

    if (updateAppointmentDto.typeId !== undefined) {
      const type = await this.typeRepository.findOne({
        where: { type_id: updateAppointmentDto.typeId },
      });
      if (!type) {
        throw new NotFoundException('Тип приема не найден');
      }
      updates.type = type;
    }

    if ('reasonId' in updateAppointmentDto) {
      if (updateAppointmentDto.reasonId === null) {
        updates.reason = undefined;
      } else if (updateAppointmentDto.reasonId) {
        const reason = await this.reasonRepository.findOne({
          where: { reason_id: updateAppointmentDto.reasonId },
        });
        if (!reason) {
          throw new NotFoundException('Причина приема не найдена');
        }
        updates.reason = reason;
      }
    }

    if (updateAppointmentDto.appointmentDate) {
      updates.appointment_date = new Date(updateAppointmentDto.appointmentDate);
    }

    if (updateAppointmentDto.startTime) {
      updates.start_time = updateAppointmentDto.startTime;
    }

    if (updateAppointmentDto.endTime) {
      updates.end_time = updateAppointmentDto.endTime;
    }

    if (updateAppointmentDto.status) {
      updates.status = updateAppointmentDto.status as AppointmentStatus;
    }

    if (
      updateAppointmentDto.appointmentDate ||
      updateAppointmentDto.startTime ||
      updateAppointmentDto.endTime
    ) {
      const doctorId = updates.doctor ? updates.doctor.doctor_id : appointment.doctor.doctor_id;
      const appointmentDate = updates.appointment_date || appointment.appointment_date;
      const startTime = updates.start_time || appointment.start_time;

      const existingAppointment = await this.appointmentRepository.findOne({
        where: {
          doctor: { doctor_id: doctorId },
          appointment_date: appointmentDate,
          start_time: startTime,
          appointment_id: Not(id),
        },
      });

      if (existingAppointment) {
        throw new ConflictException('Это время уже занято');
      }
    }

    Object.assign(appointment, updates);
    return this.appointmentRepository.save(appointment);
  }

  async remove(id: number): Promise<void> {
    const result = await this.appointmentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Прием не найден');
    }
  }

  async getDoctorSchedule(doctorId: number): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: {
        doctor: { doctor_id: doctorId },
        status: AppointmentStatus.SCHEDULED,
      },
      relations: ['patient', 'type'],
      order: { appointment_date: 'ASC', start_time: 'ASC' },
    });
  }

  async updateStatus(
    id: number,
    status: AppointmentStatus,
    comments?: string
  ): Promise<Appointment> {
    const appointment = await this.findOne(id);
    appointment.status = status;

    if (comments !== undefined) {
      appointment.recommendations = comments;
    }

    return this.appointmentRepository.save(appointment);
  }
}
