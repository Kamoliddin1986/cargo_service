import { JwtModule, JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Otp } from '../otp/models/otp.model';
import { DriverCargo } from '../driver_cargo/models/driver_cargo.model';
import { Order } from './models/order.Model';
import { Cargo } from '../cargo/models/cargo.model';

@Module({
  imports:[SequelizeModule.forFeature([Otp,Cargo,Order,]),JwtModule.register({})],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
