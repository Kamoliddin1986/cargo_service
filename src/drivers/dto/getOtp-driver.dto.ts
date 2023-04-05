import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString,IsEmail, IsPhoneNumber  } from "class-validator";


export class GetOtpDriverDto {
    @ApiProperty({ example: '+998931755555', description: 'Xaydovchi raqami'})
    @IsNotEmpty()
    @IsString()
    phone: string;
}
