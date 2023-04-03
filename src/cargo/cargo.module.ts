import { Module } from '@nestjs/common';
import { CargoService } from './cargo.service';
import { CargoController } from './cargo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cargo } from './models/cargo.model';
import { Order } from '../order/models/order.model';
import { Status } from '../status/models/status.model';
import { WeightCategory } from '../weight_category/models/weight_category.model';
import { VolumeCategory } from '../volume_category/models/volume_category.model';
import { DriverCargo } from '../driver_cargo/models/driver_cargo.model';

@Module({
  imports: [SequelizeModule.forFeature([Cargo,DriverCargo,Status,WeightCategory,VolumeCategory,Order])],
  controllers: [CargoController],
  providers: [CargoService]
})
export class CargoModule {}
