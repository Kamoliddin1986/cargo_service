import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DriverCargoService } from './driver_cargo.service';
import { CreateDriverCargoDto } from './dto/create-driver_cargo.dto';
import { UpdateDriverCargoDto } from './dto/update-driver_cargo.dto';

@Controller('driver-cargo')
export class DriverCargoController {
  constructor(private readonly driverCargoService: DriverCargoService) {}

  @Post()
  create(@Body() createDriverCargoDto: CreateDriverCargoDto) {
    return this.driverCargoService.create(createDriverCargoDto);
  }

  @Get()
  findAll() {
    return this.driverCargoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driverCargoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverCargoDto: UpdateDriverCargoDto) {
    return this.driverCargoService.update(+id, updateDriverCargoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverCargoService.remove(+id);
  }
}
