import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './models/status.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class StatusService {
  constructor(
    @InjectModel(Status) private StatusRepo: typeof Status
    ) {}
  
    create(createStatusDto: CreateStatusDto) {
      return this.StatusRepo.create(createStatusDto)
    }
  
    async findAll() {
  
      const verib = await this.StatusRepo.findAll({include:{all: true}})
      return verib
    }
  
    async findOne(id: number) {
      const verib = await this.StatusRepo.findByPk(id,{include:{all: true}})
      return verib
    }
  
    async update(id: number, updateStatusDto: UpdateStatusDto) {
      const verib = await this.StatusRepo.update(updateStatusDto, {where: {id}})
      return verib
    }
  
    remove(id: number) {
      return this.StatusRepo.destroy({where: {id}})
    }
  }

