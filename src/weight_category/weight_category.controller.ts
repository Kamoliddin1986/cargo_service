import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { WeightCategoryService } from './weight_category.service';
import { CreateWeightCategoryDto } from './dto/create-weight_category.dto';
import { UpdateWeightCategoryDto } from './dto/update-weight_category.dto';
import { ApiTags } from '@nestjs/swagger';
import { isActiveAdminGuard } from '../guard/isActiveAdmin.guard';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';


@ApiTags('weight_category')
@Controller('weight-category')
export class WeightCategoryController {
  constructor(private readonly weightCategoryService: WeightCategoryService) {}


  @UseGuards(isActiveAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createWeightCategoryDto: CreateWeightCategoryDto) {
    return this.weightCategoryService.create(createWeightCategoryDto);
  }

  @UseGuards(isActiveAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.weightCategoryService.findAll();
  }


  @UseGuards(isActiveAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weightCategoryService.findOne(+id);
  }


  @UseGuards(isActiveAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeightCategoryDto: UpdateWeightCategoryDto) {
    return this.weightCategoryService.update(+id, updateWeightCategoryDto);
  }


  @UseGuards(isActiveAdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weightCategoryService.remove(+id);
  }
}
