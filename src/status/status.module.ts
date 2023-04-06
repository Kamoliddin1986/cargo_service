import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Status } from './models/status.model';
import { DriverCargo } from '../driver_cargo/models/driver_cargo.model';
import { Cargo } from '../cargo/models/cargo.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Status,DriverCargo,Cargo]),JwtModule],
  controllers: [StatusController],
  providers: [StatusService]
})
export class StatusModule {}
