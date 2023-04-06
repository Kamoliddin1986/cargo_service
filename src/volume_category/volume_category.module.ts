import { Module } from '@nestjs/common';
import { VolumeCategoryService } from './volume_category.service';
import { VolumeCategoryController } from './volume_category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { VolumeCategory } from './models/volume_category.model';
import { Cargo } from '../cargo/models/cargo.model';
import { Driver } from '../drivers/models/driver.model';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([VolumeCategory,Cargo,Driver]),JwtModule],
  controllers: [VolumeCategoryController],
  providers: [VolumeCategoryService]
})
export class VolumeCategoryModule {}
