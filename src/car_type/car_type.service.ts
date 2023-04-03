import { Injectable } from '@nestjs/common';
import { CreateCarTypeDto } from './dto/create-car_type.dto';
import { UpdateCarTypeDto } from './dto/update-car_type.dto';

@Injectable()
export class CarTypeService {
  create(createCarTypeDto: CreateCarTypeDto) {
    return 'This action adds a new carType';
  }

  findAll() {
    return `This action returns all carType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carType`;
  }

  update(id: number, updateCarTypeDto: UpdateCarTypeDto) {
    return `This action updates a #${id} carType`;
  }

  remove(id: number) {
    return `This action removes a #${id} carType`;
  }
}
