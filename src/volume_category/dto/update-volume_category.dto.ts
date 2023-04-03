import { PartialType } from '@nestjs/mapped-types';
import { CreateVolumeCategoryDto } from './create-volume_category.dto';

export class UpdateVolumeCategoryDto extends PartialType(CreateVolumeCategoryDto) {}
