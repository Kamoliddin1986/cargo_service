import { Injectable } from '@nestjs/common';
import { CreateWeightCategoryDto } from './dto/create-weight_category.dto';
import { UpdateWeightCategoryDto } from './dto/update-weight_category.dto';
import { WeightCategory } from './models/weight_category.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class WeightCategoryService {
  constructor(
    @InjectModel(WeightCategory) private WeightCategoryRepo: typeof WeightCategory
    ) {}
  
    create(createWeightCategoryDto: CreateWeightCategoryDto) {
      return this.WeightCategoryRepo.create(createWeightCategoryDto)
    }
  
    async findAll() {
  
      const verib = await this.WeightCategoryRepo.findAll({include:{all: true}})
      return verib
    }
  
    async findOne(id: number) {
      const verib = await this.WeightCategoryRepo.findByPk(id,{include:{all: true}})
      return verib
    }
  
    async update(id: number, updateWeightCategoryDto: UpdateWeightCategoryDto) {
      const verib = await this.WeightCategoryRepo.update(updateWeightCategoryDto, {where: {id}})
      return verib
    }
  
    remove(id: number) {
      return this.WeightCategoryRepo.destroy({where: {id}})
    }
  }
