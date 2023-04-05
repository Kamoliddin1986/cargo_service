import { Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { Otp } from './models/otp.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel(Otp) private OtpRepo: typeof Otp
    ) {}
  
    create(createOtpDto: CreateOtpDto) {
      return this.OtpRepo.create(createOtpDto)
    }
  
    async findAll() {
  
      const verib = await this.OtpRepo.findAll({include:{all: true}})
      return verib
    }
  
    async findOne(id: number) {
      const verib = await this.OtpRepo.findByPk(id,{include:{all: true}})
      return verib
    }
  
    async update(id: number, updateOtpDto: UpdateOtpDto) {
      const verib = await this.OtpRepo.update(updateOtpDto, {where: {id}})
      return verib
    }
  
    remove(id: number) {
      return this.OtpRepo.destroy({where: {id}})
    }
  }

