import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString,IsEmail, IsPhoneNumber  } from "class-validator";


export class VerifyOtpDriverDto {

    @ApiProperty({ example: '+998931755555', description: 'xaydovchi raqami'})
    @IsNotEmpty()
    @IsString()
    check: string;

    @ApiProperty({ example: 'key', description: 'backenddan kelgan kod'})
    @IsNotEmpty()
    @IsString()
    verification_key: string;

    @ApiProperty({ example: '2552', description: 'otp raqam'})
    @IsNotEmpty()
    @IsString()
    otp: string
}