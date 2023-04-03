import { Module } from '@nestjs/common';
import { WeightCategoryService } from './weight_category.service';
import { WeightCategoryController } from './weight_category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { WeightCategory } from './models/weight_category.model';
import { Cargo } from '../cargo/models/cargo.model';
import { Driver } from '../drivers/models/driver.model';

@Module({
  imports: [SequelizeModule.forFeature([WeightCategory,Cargo,Driver])],
  controllers: [WeightCategoryController],
  providers: [WeightCategoryService]
})
export class WeightCategoryModule {}
