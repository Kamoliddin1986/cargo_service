import { Injectable } from '@nestjs/common';
import { CreateVolumeCategoryDto } from './dto/create-volume_category.dto';
import { UpdateVolumeCategoryDto } from './dto/update-volume_category.dto';

@Injectable()
export class VolumeCategoryService {
  create(createVolumeCategoryDto: CreateVolumeCategoryDto) {
    return 'This action adds a new volumeCategory';
  }

  findAll() {
    return `This action returns all volumeCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} volumeCategory`;
  }

  update(id: number, updateVolumeCategoryDto: UpdateVolumeCategoryDto) {
    return `This action updates a #${id} volumeCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} volumeCategory`;
  }
}
