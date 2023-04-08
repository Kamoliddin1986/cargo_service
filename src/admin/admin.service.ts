import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import * as bcrypt from 'bcryptjs'
import { Response} from 'express';
import { LoginAdminDto } from './dto/login-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private AdminRepo: typeof Admin,
    private readonly jwtService: JwtService
    ) {}
  

  async registration(createAdminDto: CreateAdminDto, res: Response
    ) {
    const Admin = await this.AdminRepo.findOne({
      where: {login: createAdminDto.login}
    })

    if(Admin) {
      throw new BadRequestException('Admin is exists');
    }

    if(createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException('Password is not match!');
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password,7);
    const newAdmin = await this.AdminRepo.create({
      ...createAdminDto,
      hashed_password: hashed_password
    })

    const tokens = await this.getToken(newAdmin)

    
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)

    const updateAdmin = await this.AdminRepo.update({
      hashed_refresh_token: hashed_refresh_token
    },
    {
      where: {id: newAdmin.id}, returning: true
    })

    let msg = 'Admin registrated'  

    return await this.write_to_cookie(tokens,msg,updateAdmin,res)  

  }

  
  async write_to_cookie(tokens: any, msg: string, update: any, res: Response ) {
    res.cookie('refresh_token', `${tokens.refresh_token}`, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })

  const response = {
    message: msg,
    admin: update,
    tokens,
  };
  return response
  }

  async getToken(Admin: Admin) {
    const jwtPayload = {
      role: 'Admin',
      id: Admin.id,
      is_active: Admin.is_active,
      is_creator: Admin.is_creator
    };

    const [accessToken, refreshToken] =await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME
      })
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken
    }
  }


  async login(loginAdminDto: LoginAdminDto, res: Response) {
    const {login, password} = loginAdminDto;
    const admin = await this.AdminRepo.findOne({ where: {login}});
    if(!admin) {
      throw new BadRequestException('admin not registered!!');
    }


    const isMatchPass = await bcrypt.compare(password, admin.hashed_password)
    if(!isMatchPass) {
      throw new BadRequestException('admin not registered(pass)!!');
    }

    const tokens = await this.getToken(admin)

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token,7)

    const updateAdmin = await this.AdminRepo.update({
      hashed_refresh_token: hashed_refresh_token},
     {where: {id: admin.id}, returning: true}
    ) 

   
    let msg = 'admin signed in'
   
  
    return await this.write_to_cookie(tokens,msg,updateAdmin,res) 
  }

  async activationAdmin(id:number){
    const updatedAdmin = await this.AdminRepo.update({is_active: true}, {returning: true, where: {id}})
  return updatedAdmin
  
  }

  async deActivationAdmin(id:number){
    const updatedAdmin = await this.AdminRepo.update({is_active: false}, {returning: true, where: {id}})
  return updatedAdmin
  
  }




  async findAll() {
  
    const verib = await this.AdminRepo.findAll({include:{all: true}})
    return verib
  }

  async findOne(id: number) {
    const verib = await this.AdminRepo.findByPk(id,{include:{all: true}})
    return verib
  }

  async update(id: number, updateCarTypeDto: UpdateAdminDto) {
    const verib = await this.AdminRepo.update(updateCarTypeDto, {returning: true, where: {id}})
    // const tokens = await this.getToken(verib[1][0])
    // return await this.write_to_cookie(tokens,'order updated',verib[1][0], res)
  }

  remove(id: number) {
    return this.AdminRepo.destroy({where: {id}})
  }
}
