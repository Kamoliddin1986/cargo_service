import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString,IsEmail, IsPhoneNumber  } from "class-validator";

export class UpdateOrderDto  {

    @ApiProperty({ example: 'Zakazchik', description: 'buyurtmachi ismi'})
    @IsString()
    first_name?: string;

    @ApiProperty({ example: 'Zakazchikov', description: 'buyurtmachi familiyasi'})
    @IsString()
    last_name?: string;

    @ApiProperty({ example: 'Zakazchikov@email.uz', description: 'buyurtmachi emaili'})
    @IsEmail()
    email?: string;

}
