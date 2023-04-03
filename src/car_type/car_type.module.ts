import { Module } from '@nestjs/common';
import { CarTypeService } from './car_type.service';
import { CarTypeController } from './car_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarType } from './models/car_type.model';
import { Driver } from '../drivers/models/driver.model';

@Module({
  imports: [SequelizeModule.forFeature([CarType,Driver])],
  controllers: [CarTypeController],
  providers: [CarTypeService]
})
export class CarTypeModule {}
