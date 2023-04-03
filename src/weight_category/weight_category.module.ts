import { Module } from '@nestjs/common';
import { WeightCategoryService } from './weight_category.service';
import { WeightCategoryController } from './weight_category.controller';

@Module({
  controllers: [WeightCategoryController],
  providers: [WeightCategoryService]
})
export class WeightCategoryModule {}
