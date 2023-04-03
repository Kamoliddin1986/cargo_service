import { PartialType } from '@nestjs/mapped-types';
import { CreateDriverCargoDto } from './create-driver_cargo.dto';

export class UpdateDriverCargoDto extends PartialType(CreateDriverCargoDto) {}
