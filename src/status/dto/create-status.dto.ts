import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class CreateStatusDto {

    @ApiProperty({ example: 'waiting_for_driver, loading, unloading', description: 'yukning xozirgi statusi'})
    @IsNotEmpty()
    @IsString()
    name: string
}
