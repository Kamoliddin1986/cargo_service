import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Driver } from './models/driver.model';
import { DriverCargo } from '../driver_cargo/models/driver_cargo.model';
import { WeightCategory } from '../weight_category/models/weight_category.model';
import { VolumeCategory } from '../volume_category/models/volume_category.model';
import { Otp } from '../otp/models/otp.model';
import { CarType } from '../car_type/models/car_type.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Driver,DriverCargo,CarType,WeightCategory,VolumeCategory,Otp]),JwtModule.register({})],
  controllers: [DriversController],
  providers: [DriversService]
})
export class DriversModule {}
