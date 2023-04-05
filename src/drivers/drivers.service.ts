import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Driver } from './models/driver.model';
import { Otp } from '../otp/models/otp.model';
import { JwtService } from '@nestjs/jwt';
import * as otpGenerator from 'otp-generator'
import * as bcrypt from 'bcrypt'
import { Response, response } from 'express';
import { GetOtpDriverDto } from './dto/getOtp-driver.dto';
import { AddMinutesToDate } from '../helpers/addMinutes';
import { dates, decode, encode } from '../helpers/crypto';
import { VerifyOtpDriverDto } from './dto/verifyOtp-driver.dto';
import { log } from 'console';

@Injectable()
export class DriversService {
  constructor(
    @InjectModel(Driver) private DriverRepo: typeof Driver,
    @InjectModel(Otp) private OtpRepo: typeof Otp,
    private readonly jwtService: JwtService
    ) {}

  async write_to_cookie(tokens: any, msg: string, update: any, res: Response ) {
    res.cookie('refresh_token', `${tokens.refresh_token}`, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })

  const response = {
    message: msg,
    user: update,
    tokens,
  };
  return response
  }

  

  async getToken(Driver: Driver) {
    const jwtPayload = {
      role: 'Driver',
      id: Driver.id,
      is_active: Driver.is_active,
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


  
async newOtp(getOtpDriverDto: GetOtpDriverDto){
  const phone_number = getOtpDriverDto.phone;

  const otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false
  });

  const now = new Date();
  const expiration_time = AddMinutesToDate(now,20);
  
  const existsOtp = await this.OtpRepo.findOne({
    where: {check: phone_number}
  })
  
  let sendOtp
  if(existsOtp){
    const  updateOtp = await this.OtpRepo.update({
      otp,
      expiration_time,
      verified:false
    }, {returning: true, where: {check: phone_number}})
    sendOtp = updateOtp[1][0]
    
  }else{
    
    const newOtp = await this.OtpRepo.create({
      otp,
      expiration_time: expiration_time,
      check: phone_number
    });
    
    sendOtp = newOtp
  }
  
  const details = {
    timestamp: now,
    check: phone_number,
    success: true,
    message: 'Otp send to user',
    otp_id: sendOtp.id,
  }
  
  const encoded = await encode(JSON.stringify(details));
  return { status: 'Success', Details: encoded}

  
}

async verifyOtp(verifyOtpDriverDto: VerifyOtpDriverDto, res: Response) {
  const { verification_key, otp, check} = verifyOtpDriverDto
  const currentdate = new Date();
  const decod = await decode(verification_key);
  const obj = JSON.parse(decod);
  const check_obj = obj.check
  
  
  if(check_obj !=check) {
    throw new BadRequestException('OTP bu raqamga yuborilmagan')
  }

  const result = await this.OtpRepo.findOne({
    where: { id: obj.otp_id}
  });

  if (result !=null) {
    if(!result.verified) {
      if(dates.compare(result.expiration_time, currentdate)) {
        if (otp ===result.otp) {
          const verified_otp = await this.OtpRepo.update(
            {verified: true},
            {where: {id: obj.otp_id}, returning: true}
          )

            const oldDriver = await this.DriverRepo.findOne({
              where: {phone: check}
            })
            
             
            let tokens: any;
            let Driver = oldDriver
            console.log('OLDDRIVER......',Driver);
          let message: string
          let hashed_refresh_token:string;
          if(oldDriver) {
            message ='old Driver otp updating'
            tokens = await this.getToken(oldDriver);
            hashed_refresh_token = await bcrypt.hash(tokens.refresh_token,7)
            
          }else{
            
            const newDriver = await this.DriverRepo.create({
              phone: check, otp_id: result.id})
              tokens = await this.getToken(newDriver)
              hashed_refresh_token = await bcrypt.hash(tokens.refresh_token,7)
              message = 'new Driver created',
              Driver = newDriver
            }

          const updateDriver = await this.DriverRepo.update({hashed_refresh_token},{returning: true, where: {id: Driver.id}})

          return await this.write_to_cookie(tokens,message,updateDriver[1][0],res)

        }else {
          throw new BadRequestException('OTP is not match')
        }
      }else{
        throw new BadRequestException('OTP expired')
      }
    }else{
      throw new BadRequestException('OTP alredy Used')
    }
  }else{
    throw new BadRequestException('bunday foydalanuvchi yuq')
  }


}



async createPhone (phone: string, otp_id: number){
  const ord = await this.DriverRepo.create({phone, otp_id})
  return ord
}

async findAll() {
  
  const verib = await this.DriverRepo.findAll({include:{all: true}})
  return verib
}

async findOne(id: number) {
  const verib = await this.DriverRepo.findByPk(id,{include:{all: true}})
  return verib
}

async update(id: number, updateDriverDto: UpdateDriverDto) {


  const verib = await this.DriverRepo.update(updateDriverDto, {where: {id}})
  return verib
}

remove(id: number) {
  return this.DriverRepo.destroy({where: {id}})
}
}
