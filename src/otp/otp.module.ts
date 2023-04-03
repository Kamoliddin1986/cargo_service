import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Otp } from './models/otp.model';
import { Order } from '../order/models/order.model';
import { Driver } from '../drivers/models/driver.model';

@Module({
  imports: [SequelizeModule.forFeature([Otp,Order,Driver])],
  controllers: [OtpController],
  providers: [OtpService]
})
export class OtpModule {}
