import { Injectable } from '@nestjs/common';
import { CreateVolumeCategoryDto } from './dto/create-volume_category.dto';
import { UpdateVolumeCategoryDto } from './dto/update-volume_category.dto';
import { VolumeCategory } from './models/volume_category.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class VolumeCategoryService {
  constructor(
    @InjectModel(VolumeCategory) private VolumeCategoryRepo: typeof VolumeCategory
    ) {}
  
    create(createVolumeCategoryDto: CreateVolumeCategoryDto) {
      return this.VolumeCategoryRepo.create(createVolumeCategoryDto)
    }
  
    async findAll() {
  
      const verib = await this.VolumeCategoryRepo.findAll({include:{all: true}})
      return verib
    }
  
    async findOne(id: number) {
      const verib = await this.VolumeCategoryRepo.findByPk(id,{include:{all: true}})
      return verib
    }
  
    async update(id: number, updateVolumeCategoryDto: UpdateVolumeCategoryDto) {
      const verib = await this.VolumeCategoryRepo.update(updateVolumeCategoryDto, {where: {id}})
      return verib
    }
  
    remove(id: number) {
      return this.VolumeCategoryRepo.destroy({where: {id}})
    }
  }

