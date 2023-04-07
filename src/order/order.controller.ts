import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { FirstUpdateOrderDto } from './dto/firstUpdate-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetOtpOrderDto } from './dto/getOtp-order.dto';
import { VerifyOtpOrderDto } from './dto/verifyOtp-order.dto';
import { Response } from 'express';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { isOrderGuard } from '../guard/isOrder.guard';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { isOrderSelfGuard } from '../guard/isOrderSelf.guard';


@ApiTags('order')

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('newotp')
  newOtp(@Body() getOtpOrderDto: GetOtpOrderDto) {
    return this.orderService.newOtp(getOtpOrderDto);
  }
  @Post('verifyotp')
  verifyOtp(@Body() verifyOtpOrderDto: VerifyOtpOrderDto,
  @Res({passthrough: true}) res: Response) {
    return this.orderService.verifyOtp(verifyOtpOrderDto,res);
  }

  @UseGuards(isOrderGuard)
  @UseGuards(JwtAuthGuard)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({passthrough: true}) res: Response
  ){
    return this.orderService.refreshToken(+id,refreshToken,res)
  }


  @UseGuards(isOrderGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @UseGuards(isOrderSelfGuard)
  @UseGuards(isOrderGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @UseGuards(isOrderSelfGuard)
  @UseGuards(isOrderGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto,
  @Res({passthrough: true}) res: Response) {
    return this.orderService.update(+id, updateOrderDto, res);
  }

  @UseGuards(isOrderSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Patch('/firstupdate/:id')
  firstUpdate(@Param('id') id: string, @Body() firstupdateOrderDto: FirstUpdateOrderDto,
  @Res({passthrough: true}) res: Response) {
    return this.orderService.firstUpdate(+id, firstupdateOrderDto, res);
  }

  @UseGuards(isOrderSelfGuard)
  @UseGuards(isOrderSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
