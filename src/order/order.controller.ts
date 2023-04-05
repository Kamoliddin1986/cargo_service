import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { FirstUpdateOrderDto } from './dto/firstUpdate-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetOtpOrderDto } from './dto/getOtp-order.dto';
import { VerifyOtpOrderDto } from './dto/verifyOtp-order.dto';
import { Response } from 'express';
import { UpdateOrderDto } from './dto/update-order.dto';


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

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }


  @Patch('/firstupdate/:id')
  firstUpdate(@Param('id') id: string, @Body() firstupdateOrderDto: FirstUpdateOrderDto) {
    return this.orderService.firstUpdate(+id, firstupdateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
