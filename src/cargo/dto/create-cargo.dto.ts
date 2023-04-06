import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString,IsDate, IsDateString } from "class-validator";


export class CreateCargoDto {

    @ApiProperty({ example: '1,2,3', description: 'yuk vazni kategoriyasi'})
    @IsNotEmpty()
    @IsNumber()
    weight_category_id: number;
    
    @ApiProperty({ example: '1,2,3', description: 'yuk xajmi kategoriyasi'})
    @IsNotEmpty()
    @IsNumber()
    volume_category_id: number;
    
    @ApiProperty({ example: 'lat: 35.36.36, lon: 25.25.25', description: 'yuk ortiw joyi locationi'})
    @IsNotEmpty()
    @IsString()
    loading_location: string;

        
    @ApiProperty({ example: 'lat: 35.36.36, lon: 25.25.25', description: 'yuk tuwiriw joyi locationi'})
    @IsNotEmpty()
    @IsString()
    unloading_location: string;

    @ApiProperty({ example: '1,2,3', description: 'buyurtmachi IDsi'})
    @IsNotEmpty()
    @IsNumber()
    order_id: number;

    @ApiProperty({ example: '2022-01-01', description: 'yuk ortiladigan sana'})
    @IsNotEmpty()
    @IsDateString()
    loading_date: Date;

    @ApiProperty({ example: '2022-01-01', description: 'yuk etkaziw kk bolgan sana'})
    @IsNotEmpty()
    @IsDateString()
    unloading_date: Date;


    @ApiProperty({ example: '150000', description: 'xizmat xaqqi'})
    @IsNotEmpty()
    @IsNumber()
    price: number;

}
