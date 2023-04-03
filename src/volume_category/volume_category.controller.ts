import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VolumeCategoryService } from './volume_category.service';
import { CreateVolumeCategoryDto } from './dto/create-volume_category.dto';
import { UpdateVolumeCategoryDto } from './dto/update-volume_category.dto';

@Controller('volume-category')
export class VolumeCategoryController {
  constructor(private readonly volumeCategoryService: VolumeCategoryService) {}

  @Post()
  create(@Body() createVolumeCategoryDto: CreateVolumeCategoryDto) {
    return this.volumeCategoryService.create(createVolumeCategoryDto);
  }

  @Get()
  findAll() {
    return this.volumeCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.volumeCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVolumeCategoryDto: UpdateVolumeCategoryDto) {
    return this.volumeCategoryService.update(+id, updateVolumeCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.volumeCategoryService.remove(+id);
  }
}
