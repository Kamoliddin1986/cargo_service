import { Injectable } from '@nestjs/common';
import { DriverCargo } from './models/driver_cargo.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDriverCargoDto } from './dto/create-driver_cargo.dto';
import { UpdateDriverCargoDto } from './dto/update-driver_cargo.dto';

@Injectable()
export class DriverCargoService {
  constructor(
    @InjectModel(DriverCargo) private DriverCargoRepo: typeof DriverCargo
    ) {}
  
    create(createDriverCargoDto: CreateDriverCargoDto) {
      return this.DriverCargoRepo.create(createDriverCargoDto)
    }
  
    async findAll() {
  
      const verib = await this.DriverCargoRepo.findAll({include:{all: true}})
      return verib
    }
  
    async findOne(id: number) {
      const verib = await this.DriverCargoRepo.findByPk(id,{include:{all: true}})
      return verib
    }
  
    async update(id: number, updateDriverCargoDto: UpdateDriverCargoDto) {
      const verib = await this.DriverCargoRepo.update(updateDriverCargoDto, {where: {id}})
      return verib
    }

 
  
    remove(id: number) {
      return this.DriverCargoRepo.destroy({where: {id: id}})
    }
  }

