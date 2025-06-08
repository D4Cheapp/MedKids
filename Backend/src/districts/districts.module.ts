import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from './district.entity';
import { DistrictsService } from './districts.service';

@Module({
  imports: [TypeOrmModule.forFeature([District])],
  providers: [DistrictsService],
  exports: [DistrictsService],
})
export class DistrictsModule {}
