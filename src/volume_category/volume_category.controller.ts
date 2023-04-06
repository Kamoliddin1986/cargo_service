import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VolumeCategoryService } from './volume_category.service';
import { CreateVolumeCategoryDto } from './dto/create-volume_category.dto';
import { UpdateVolumeCategoryDto } from './dto/update-volume_category.dto';
import { ApiTags } from '@nestjs/swagger';
import { isActiveAdminGuard } from '../guard/isActiveAdmin.guard';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';


@ApiTags('volume_category')
@Controller('volume-category')
export class VolumeCategoryController {
  constructor(private readonly volumeCategoryService: VolumeCategoryService) {}


  @UseGuards(isActiveAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createVolumeCategoryDto: CreateVolumeCategoryDto) {
    return this.volumeCategoryService.create(createVolumeCategoryDto);
  }


  @UseGuards(isActiveAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.volumeCategoryService.findAll();
  }


  @UseGuards(isActiveAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.volumeCategoryService.findOne(+id);
  }


  @UseGuards(isActiveAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVolumeCategoryDto: UpdateVolumeCategoryDto) {
    return this.volumeCategoryService.update(+id, updateVolumeCategoryDto);
  }


  @UseGuards(isActiveAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.volumeCategoryService.remove(+id);
  }
}
