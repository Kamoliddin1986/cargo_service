import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString,IsEmail, IsPhoneNumber, IsNumber  } from "class-validator";

export class FirstUpdateDriverDto{

    @ApiProperty({ example: 'palonchi', description: 'Xaydovchi ismi'})
    @IsNotEmpty()
    @IsString()
    first_name: string;

    @ApiProperty({ example: 'palonchiev', description: 'Xaydovchi familiyasi'})
    @IsNotEmpty()
    @IsString()
    last_name: string;

    @ApiProperty({ example: '1,2', description: 'yukni oliw imkoniyati IDsi'})
    @IsNotEmpty()
    @IsNumber()
    weight_category_id: number;

    @ApiProperty({ example: '1,2...', description: 'mowina turi IDsi'})
    @IsNotEmpty()
    @IsNumber()
    car_type_id: number;

    @ApiProperty({ example: '1,2...', description: 'mowina yukxona xajm IDsi'})
    @IsNotEmpty()
    @IsNumber()
    volume_category_id: number;
}
