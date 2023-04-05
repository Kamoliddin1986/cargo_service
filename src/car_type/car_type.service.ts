import { Injectable } from '@nestjs/common';
import { CreateCarTypeDto } from './dto/create-car_type.dto';
import { UpdateCarTypeDto } from './dto/update-car_type.dto';
import { CarType } from './models/car_type.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CarTypeService {
  constructor(
    @InjectModel(CarType) private CarTypeRepo: typeof CarType
    ) {}
  
    create(createCarTypeDto: CreateCarTypeDto) {
      return this.CarTypeRepo.create(createCarTypeDto)
    }
  
    async findAll() {
  
      const verib = await this.CarTypeRepo.findAll({include:{all: true}})
      return verib
    }
  
    async findOne(id: number) {
      const verib = await this.CarTypeRepo.findByPk(id,{include:{all: true}})
      return verib
    }
  
    async update(id: number, updateCarTypeDto: UpdateCarTypeDto) {
      const verib = await this.CarTypeRepo.update(updateCarTypeDto, {where: {id}})
      return verib
    }
  
    remove(id: number) {
      return this.CarTypeRepo.destroy({where: {id}})
    }
  }

