import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { ApiTags } from '@nestjs/swagger';
import { VerifyOtpDriverDto } from './dto/verifyOtp-driver.dto';
import { GetOtpDriverDto } from './dto/getOtp-driver.dto';
import { Response } from 'express';


@ApiTags('drivers')
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}


  @Post('newotp')
  newOtp(@Body() getOtpDriverDto: GetOtpDriverDto) {
    return this.driversService.newOtp(getOtpDriverDto);
  }
  @Post('verifyotp')
  verifyOtp(@Body() verifyOtpDriverDto: VerifyOtpDriverDto,
  @Res({passthrough: true}) res: Response) {
    return this.driversService.verifyOtp(verifyOtpDriverDto, res);
  }

  @Get()
  findAll() {
    return this.driversService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driversService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driversService.update(+id, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driversService.remove(+id);
  }
}
