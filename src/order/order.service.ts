import { BadRequestException, Injectable } from '@nestjs/common';
import { FirstUpdateOrderDto } from './dto/firstUpdate-order.dto';
import { Order } from './models/order.model';
import { InjectModel } from '@nestjs/sequelize';
import { log } from 'console';
import { JwtService } from '@nestjs/jwt';
import { Response, response } from 'express';
import * as otpGenerator from 'otp-generator'

import * as bcrypt from 'bcryptjs'
import { GetOtpOrderDto } from './dto/getOtp-order.dto';
import { Otp } from '../otp/models/otp.model';
import { AddMinutesToDate } from '../helpers/addMinutes';
import {v4 as uuidv4, v4 } from 'uuid'
import { dates, decode, encode } from '../helpers/crypto';
import { VerifyOtpOrderDto } from './dto/verifyOtp-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';


@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private OrderRepo: typeof Order,
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
      order: update,
      tokens,
    };
    return response
    }
  
    
  
    async getToken(order: Order) {
      const jwtPayload = {
        role: 'order',
        id: order.id,
        is_active: order.is_active,
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
  

    
  async newOtp(getOtpOrderDto: GetOtpOrderDto){
    const phone_number = getOtpOrderDto.phone;

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
      message: 'Otp send to order',
      otp_id: sendOtp.id,
    }
    
    // console.log('ExistOtp>>>>>>>>>', sendOtp);
    const encoded = await encode(JSON.stringify(details));
    return { status: 'Success', Details: encoded}

    
  }

  async verifyOtp(verifyOtpOrderDto: VerifyOtpOrderDto,res: Response) {
    const { verification_key, otp, check} = verifyOtpOrderDto
    const currentdate = new Date();
    const decod = await decode(verification_key);
    const obj = JSON.parse(decod);
    const check_obj = obj.check

    console.log(obj);
    
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

              const oldOrder = await this.OrderRepo.findOne({
                where: {phone: check}
              })


              console.log('User>>>>>>>>>>>>>>>>>>>>>>>1>',oldOrder);
            let tokens: any;
            let order = oldOrder
            let message: string
            let hashed_refresh_token:string;
            if(oldOrder) {
              message ='old Order otp updating'
              tokens = await this.getToken(oldOrder);
              hashed_refresh_token = await bcrypt.hash(tokens.refresh_token,7)
              console.log('HASH>>>>>>>>>>>>>>>>',hashed_refresh_token);
              
            }else{
              
              const newOrder = await this.OrderRepo.create({
                phone: check, otp_id: result.id})
                tokens = await this.getToken(newOrder)
                hashed_refresh_token = await bcrypt.hash(tokens.refresh_token,7)
                message = 'new Order created',
                order = newOrder
              }

            const updateOrder = await this.OrderRepo.update({hashed_refresh_token},{returning: true, where: {id: order.id}})

            return await this.write_to_cookie(tokens,message,updateOrder[1][0],res)

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
    const ord = await this.OrderRepo.create({phone, otp_id})
    return ord
  }


  async refreshToken(order_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);

    if(order_id != decodedToken['id']) {
      throw new BadRequestException('order not founded');
    }

    const order = await this.OrderRepo.findOne({ where: { id: order_id}})
    if(!order || !order.hashed_refresh_token){
      throw new BadRequestException('User not founded')
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      order.hashed_refresh_token
    )

    if (!tokenMatch) {
      throw new BadRequestException("Taqaialngan")
    }

    const tokens = await this.getToken(order);

  }
  
    async findAll() {
  
      const verib = await this.OrderRepo.findAll({include:{all: true}})
      return verib
    }
  
    async findOne(id: number) {
      const verib = await this.OrderRepo.findByPk(id,{include:{all: true}})
      return verib
    }
  
    async firstUpdate(id: number, firstupdateOrderDto: FirstUpdateOrderDto, res: Response) {
      const verib = await this.OrderRepo.update({...firstupdateOrderDto, is_active: true}, {returning: true, where: {id}})
      
      const tokens = await this.getToken(verib[1][0])
      return await this.write_to_cookie(tokens,'order updated',verib[1][0], res)
    }

    async update(id: number, updateOrderDto: UpdateOrderDto, res: Response) {
      const verib = await this.OrderRepo.update(updateOrderDto, {returning: true, where: {id}})
      const tokens = await this.getToken(verib[1][0])
      return await this.write_to_cookie(tokens,'order updated',verib[1][0], res)
    }
  
    remove(id: number) {
      return this.OrderRepo.destroy({where: {id}})
    }
  }