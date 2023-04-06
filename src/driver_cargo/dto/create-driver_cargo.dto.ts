import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString,IsDate, IsDateString } from "class-validator";


export class CreateDriverCargoDto {


    @ApiProperty({ example: '1,2,3', description: 'Haydovchi IDsi'})
    @IsNotEmpty()
    @IsNumber()
    driver_id: number;

    @ApiProperty({ example: '1,2,3', description: 'Yuk IDsi'})
    @IsNotEmpty()
    @IsNumber()
    cargo_id: number;


}
