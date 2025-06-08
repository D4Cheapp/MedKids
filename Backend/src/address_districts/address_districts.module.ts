import { Module } from '@nestjs/common';

import { AddressDistrictsService } from './address_districts.service';

@Module({
  providers: [AddressDistrictsService],
})
export class AddressDistrictsModule {}
