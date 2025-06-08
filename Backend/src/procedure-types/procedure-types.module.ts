import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcedureType } from './procedure-type.entity';
import { ProcedureTypesService } from './procedure-types.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProcedureType])],
  providers: [ProcedureTypesService],
  exports: [ProcedureTypesService],
})
export class ProcedureTypesModule {}
