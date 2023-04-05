import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString,IsEmail, IsPhoneNumber  } from "class-validator";

export class FirstUpdateOrderDto  {

    @ApiProperty({ example: 'Zakazchik', description: 'buyurtmachi ismi'})
    @IsNotEmpty()
    @IsString()
    first_name: string;

    @ApiProperty({ example: 'Zakazchikov', description: 'buyurtmachi familiyasi'})
    @IsNotEmpty()
    @IsString()
    last_name: string;

    @ApiProperty({ example: 'Zakazchikov@email.uz', description: 'buyurtmachi emaili'})
    @IsNotEmpty()
    @IsEmail()
    email: string;


}
