import { Injectable } from '@nestjs/common';
import { CreateWeightCategoryDto } from './dto/create-weight_category.dto';
import { UpdateWeightCategoryDto } from './dto/update-weight_category.dto';

@Injectable()
export class WeightCategoryService {
  create(createWeightCategoryDto: CreateWeightCategoryDto) {
    return 'This action adds a new weightCategory';
  }

  findAll() {
    return `This action returns all weightCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} weightCategory`;
  }

  update(id: number, updateWeightCategoryDto: UpdateWeightCategoryDto) {
    return `This action updates a #${id} weightCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} weightCategory`;
  }
}
