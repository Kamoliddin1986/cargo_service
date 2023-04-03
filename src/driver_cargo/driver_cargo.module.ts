import { Module } from '@nestjs/common';
import { DriverCargoService } from './driver_cargo.service';
import { DriverCargoController } from './driver_cargo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DriverCargo } from './models/driver_cargo.model';
import { Driver } from '../drivers/models/driver.model';
import { Order } from '../order/models/order.model';
import { Status } from '../status/models/status.model';
import { Cargo } from '../cargo/models/cargo.model';

@Module({
  imports: [SequelizeModule.forFeature([DriverCargo,Cargo,Status,Driver])],
  controllers: [DriverCargoController],
  providers: [DriverCargoService]
})
export class DriverCargoModule {}
