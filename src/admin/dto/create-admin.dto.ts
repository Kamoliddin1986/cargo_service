import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString,IsEmail, IsPhoneNumber  } from "class-validator";


export class CreateAdminDto {
    @ApiProperty({ example: 'adminjon', description: 'admin ismi'})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'admin', description: 'admin logini'})
    @IsNotEmpty()
    @IsString()
    login: string;

    @ApiProperty({ example: 'password', description: 'password'})
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ example: 'password', description: 'password'})
    @IsNotEmpty()
    @IsString()
    confirm_password: string;
}
