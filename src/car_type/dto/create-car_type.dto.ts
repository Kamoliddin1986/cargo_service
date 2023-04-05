import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class CreateCarTypeDto {

    @ApiProperty({ example: 'gazel, isuzu, Man', description: 'moshina turi'})
    @IsNotEmpty()
    @IsString()
    name: string


    @ApiProperty({ example: 'bort uzunligi 5 metr', description: 'moshina xaqida qowimcha malumot'})
    @IsString()
    description: string

}
