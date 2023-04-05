import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString,IsEmail, IsPhoneNumber  } from "class-validator";


export class GetOtpOrderDto {
    @ApiProperty({ example: '+998931755555', description: 'buyurtmachi raqami'})
    @IsNotEmpty()
    @IsString()
    phone: string;
}
