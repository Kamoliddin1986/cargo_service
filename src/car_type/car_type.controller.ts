import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CarTypeService } from './car_type.service';
import { CreateCarTypeDto } from './dto/create-car_type.dto';
import { UpdateCarTypeDto } from './dto/update-car_type.dto';
import { ApiTags } from '@nestjs/swagger';
import { isActiveAdminGuard } from '../guard/isActiveAdmin.guard';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';


@ApiTags('car_type')
@Controller('car-type')
export class CarTypeController {
  constructor(private readonly carTypeService: CarTypeService) {}
  
  @UseGuards(isActiveAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCarTypeDto: CreateCarTypeDto) {
    return this.carTypeService.create(createCarTypeDto);
  }


  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.carTypeService.findAll();
  }


  @UseGuards(isActiveAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carTypeService.findOne(+id);
  }

  @UseGuards(isActiveAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarTypeDto: UpdateCarTypeDto) {
    return this.carTypeService.update(+id, updateCarTypeDto);
  }


  @UseGuards(isActiveAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carTypeService.remove(+id);
  }
}
