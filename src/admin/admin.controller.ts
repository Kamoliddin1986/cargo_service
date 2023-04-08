import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

import { LoginAdminDto } from './dto/login-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { isCreatorGuard } from '../guard/isCreatorAdmin.guard';
import { isActiveAdminGuard } from '../guard/isActiveAdmin.guard';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { isCreatorOrSelfAdminGuard } from '../guard/isCreatorAdminOrSelf.guard';
import { Response } from 'express';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('registration')
  registration(@Body() createAdminDto: CreateAdminDto,
  @Res({passthrough: true}) res: Response) {
    return this.adminService.registration(createAdminDto, res);
  }

  @Post('login')
  login(@Body() loginAdminDto: LoginAdminDto,
  @Res({passthrough: true}) res: Response) {
    return this.adminService.login(loginAdminDto, res);
  }



  @UseGuards(isCreatorGuard)
  @UseGuards(isActiveAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }


  @UseGuards(isCreatorGuard)
  @UseGuards(isActiveAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  activationAdmin(@Param('id') id: string) {
    return this.adminService.activationAdmin(+id);
  }


  @UseGuards(isCreatorGuard)
  @UseGuards(isActiveAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  deActivationAdmin(@Param('id') id: string) {
    return this.adminService.deActivationAdmin(+id);
  }

  @UseGuards(isCreatorOrSelfAdminGuard)
  @UseGuards(isActiveAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(isCreatorOrSelfAdminGuard)
  @UseGuards(isActiveAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto,
  @Res({passthrough: true}) res: Response) {
    return this.adminService.update(+id, updateAdminDto);
  }

  
  @UseGuards(isCreatorOrSelfAdminGuard)
  @UseGuards(isActiveAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
