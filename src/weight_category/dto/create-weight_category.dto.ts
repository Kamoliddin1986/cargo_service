import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateWeightCategoryDto {
    @ApiProperty({ example: '3 tonnagach, 5 tonnagacha', description: 'yuk vazni kategoriyasi'})
    @IsNotEmpty()
    @IsString()
    name: string

}
