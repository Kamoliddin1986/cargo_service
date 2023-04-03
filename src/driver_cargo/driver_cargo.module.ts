import { Module } from '@nestjs/common';
import { DriverCargoService } from './driver_cargo.service';
import { DriverCargoController } from './driver_cargo.controller';

@Module({
  controllers: [DriverCargoController],
  providers: [DriverCargoService]
})
export class DriverCargoModule {}
