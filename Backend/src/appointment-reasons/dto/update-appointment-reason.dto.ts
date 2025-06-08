import { PartialType } from '@nestjs/swagger';
import { CreateAppointmentReasonDto } from './create-appointment-reason.dto';

export class UpdateAppointmentReasonDto extends PartialType(CreateAppointmentReasonDto) {}
