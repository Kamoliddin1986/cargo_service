import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class CreateVolumeCategoryDto {

    @ApiProperty({ example: '5 Mkub gacha, 3 Mkub gacha', description: 'yuk hajmi kategoriyasi'})
    @IsNotEmpty()
    @IsString()
    name: string
}
