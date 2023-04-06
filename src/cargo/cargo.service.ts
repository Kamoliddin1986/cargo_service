import { Injectable } from '@nestjs/common';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { Cargo } from './models/cargo.model';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateCargoStatusDto } from './dto/updateStatus-cargo.dto';
import { DriverCargo } from '../driver_cargo/models/driver_cargo.model';

@Injectable()
export class CargoService {
  constructor(
    @InjectModel(Cargo) private readonly CargoRepo: typeof Cargo,
    @InjectModel(DriverCargo) private readonly DCargoRepo: typeof DriverCargo

    ) {}
  
    create(createCargoDto: CreateCargoDto) {
      return this.CargoRepo.create(createCargoDto)
    }
  
    async findAll() {
  
      const verib = await this.CargoRepo.findAll({include:{all: true}})
      return verib
    }
  
    async findOne(id: number) {
      const verib = await this.CargoRepo.findByPk(id,{include:{all: true}})
      return verib
    }
  
    async update(id: number, updateCargoDto: UpdateCargoDto) {
      const verib = await this.CargoRepo.update(updateCargoDto, {where: {id}})
      return verib
    }

    async updateCargoStatus(id: number, updateCargoStatusDto: UpdateCargoStatusDto) {
      const verib = await this.CargoRepo.update(updateCargoStatusDto, {where: {id}})
      const dcverib = await this.DCargoRepo.update(updateCargoStatusDto, {where: {id}})
      return {Cargo: verib, Driver_Cargo: dcverib}
    }
  
    remove(id: number) {
      return this.CargoRepo.destroy({where: {id}})
    }
  }
