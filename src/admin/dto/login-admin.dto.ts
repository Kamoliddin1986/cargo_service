import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString,IsEmail, IsPhoneNumber  } from "class-validator";


export class LoginAdminDto {

    @ApiProperty({ example: 'admin', description: 'admin logini'})
    @IsNotEmpty()
    @IsString()
    login: string;

    @ApiProperty({ example: 'password', description: 'password'})
    @IsNotEmpty()
    @IsString()
    password: string;
}
