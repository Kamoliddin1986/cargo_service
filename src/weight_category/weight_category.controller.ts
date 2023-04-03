import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeightCategoryService } from './weight_category.service';
import { CreateWeightCategoryDto } from './dto/create-weight_category.dto';
import { UpdateWeightCategoryDto } from './dto/update-weight_category.dto';

@Controller('weight-category')
export class WeightCategoryController {
  constructor(private readonly weightCategoryService: WeightCategoryService) {}

  @Post()
  create(@Body() createWeightCategoryDto: CreateWeightCategoryDto) {
    return this.weightCategoryService.create(createWeightCategoryDto);
  }

  @Get()
  findAll() {
    return this.weightCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weightCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeightCategoryDto: UpdateWeightCategoryDto) {
    return this.weightCategoryService.update(+id, updateWeightCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weightCategoryService.remove(+id);
  }
}
