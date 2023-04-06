import { Module } from '@nestjs/common';
import { CarTypeService } from './car_type.service';
import { CarTypeController } from './car_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarType } from './models/car_type.model';
import { Driver } from '../drivers/models/driver.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([CarType,Driver]),JwtModule],
  controllers: [CarTypeController],
  providers: [CarTypeService]
})
export class CarTypeModule {}
