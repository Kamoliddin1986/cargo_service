import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarTypeService } from './car_type.service';
import { CreateCarTypeDto } from './dto/create-car_type.dto';
import { UpdateCarTypeDto } from './dto/update-car_type.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('car_type')
@Controller('car-type')
export class CarTypeController {
  constructor(private readonly carTypeService: CarTypeService) {}

  @Post()
  create(@Body() createCarTypeDto: CreateCarTypeDto) {
    return this.carTypeService.create(createCarTypeDto);
  }

  @Get()
  findAll() {
    return this.carTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarTypeDto: UpdateCarTypeDto) {
    return this.carTypeService.update(+id, updateCarTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carTypeService.remove(+id);
  }
}
