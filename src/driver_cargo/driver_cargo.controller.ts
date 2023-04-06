import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DriverCargoService } from './driver_cargo.service';
import { CreateDriverCargoDto } from './dto/create-driver_cargo.dto';
import { UpdateDriverCargoDto } from './dto/update-driver_cargo.dto';
import { isOrderGuard } from '../guard/isOrder.guard';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { isDriverGuard } from '../guard/isDriver.guard';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('drivers-cargo')
@Controller('driver-cargo')
export class DriverCargoController {
  constructor(private readonly driverCargoService: DriverCargoService) {}


  @UseGuards(isDriverGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDriverCargoDto: CreateDriverCargoDto) {
    return this.driverCargoService.create(createDriverCargoDto);
  }


  @UseGuards(isDriverGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.driverCargoService.findAll();
  }


  @UseGuards(isDriverGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driverCargoService.findOne(+id);
  }


  @UseGuards(isDriverGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverCargoDto: UpdateDriverCargoDto) {
    return this.driverCargoService.update(+id, updateDriverCargoDto);
  }


  @UseGuards(isDriverGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverCargoService.remove(+id);
  }
}
