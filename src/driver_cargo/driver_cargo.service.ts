import { Injectable } from '@nestjs/common';
import { CreateDriverCargoDto } from './dto/create-driver_cargo.dto';
import { UpdateDriverCargoDto } from './dto/update-driver_cargo.dto';

@Injectable()
export class DriverCargoService {
  create(createDriverCargoDto: CreateDriverCargoDto) {
    return 'This action adds a new driverCargo';
  }

  findAll() {
    return `This action returns all driverCargo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} driverCargo`;
  }

  update(id: number, updateDriverCargoDto: UpdateDriverCargoDto) {
    return `This action updates a #${id} driverCargo`;
  }

  remove(id: number) {
    return `This action removes a #${id} driverCargo`;
  }
}
