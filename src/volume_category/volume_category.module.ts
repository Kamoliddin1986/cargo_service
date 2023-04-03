import { Module } from '@nestjs/common';
import { VolumeCategoryService } from './volume_category.service';
import { VolumeCategoryController } from './volume_category.controller';

@Module({
  controllers: [VolumeCategoryController],
  providers: [VolumeCategoryService]
})
export class VolumeCategoryModule {}
