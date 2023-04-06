
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString,IsDate } from "class-validator";


export class UpdateCargoStatusDto {

@ApiProperty({ example: '1,2,3', description: 'yukning joriy xolati IDsi'})
@IsNotEmpty()
@IsNumber()
status_id: number;

}