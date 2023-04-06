import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { ApiTags } from '@nestjs/swagger';
import { VerifyOtpDriverDto } from './dto/verifyOtp-driver.dto';
import { GetOtpDriverDto } from './dto/getOtp-driver.dto';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { FirstUpdateDriverDto } from './dto/firstUpdate-driver.dto';
import { isDriverGuard } from '../guard/isDriver.guard';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';


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


  @UseGuards(isDriverGuard)
  @UseGuards(JwtAuthGuard)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({passthrough: true}) res: Response
  ){
    return this.driversService.refreshToken(+id,refreshToken,res)
  }


  @UseGuards(isDriverGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.driversService.findAll();
  }


  @UseGuards(isDriverGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driversService.findOne(+id);
  }


  @UseGuards(isDriverGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driversService.update(+id, updateDriverDto);
  }
  

  @UseGuards(isDriverGuard)
  @UseGuards(JwtAuthGuard)
  @Patch('/firstupdate/:id')
  firstupdate(@Param('id') id: string, @Body() firstUpdateDriverDto: FirstUpdateDriverDto) {
    return this.driversService.firstUpdate(+id, firstUpdateDriverDto);
  }

  @UseGuards(isDriverGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driversService.remove(+id);
  }
}
