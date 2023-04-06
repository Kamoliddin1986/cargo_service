import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CargoService } from './cargo.service';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { UpdateCargoStatusDto } from './dto/updateStatus-cargo.dto';
import { isOrderGuard } from '../guard/isOrder.guard';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@Controller('cargo')
export class CargoController {
  constructor(private readonly cargoService: CargoService) {}


  @UseGuards(isOrderGuard)
  @UseGuards(JwtAuthGuard)
  @Post()  
  create(@Body() createCargoDto: CreateCargoDto) {
    return this.cargoService.create(createCargoDto);
  }


  @UseGuards(isOrderGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.cargoService.findAll();
  }

  @UseGuards(isOrderGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cargoService.findOne(+id);
  }

  @UseGuards(isOrderGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCargoDto: UpdateCargoDto) {
    return this.cargoService.update(+id, updateCargoDto);
  }

  @UseGuards(isOrderGuard)
  @UseGuards(JwtAuthGuard)
  @Patch('status/:id')
  updateCargoStatus(@Param('id') id: string, @Body() updateCargoStatusDto: UpdateCargoStatusDto) {
    return this.cargoService.updateCargoStatus(+id, updateCargoStatusDto);
  }

  @UseGuards(isOrderGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cargoService.remove(+id);
  }
}
