import { PartialType } from '@nestjs/mapped-types';
import { CreateWeightCategoryDto } from './create-weight_category.dto';

export class UpdateWeightCategoryDto extends PartialType(CreateWeightCategoryDto) {}
