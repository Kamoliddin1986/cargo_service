import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { IsDate } from "sequelize-typescript";


export class CreateOtpDto {

    @ApiProperty({ example: '3542', description: 'otp'})
    @IsNotEmpty()
    @IsString()
    otp: string;

    @ApiProperty({ example: '113215464', description: 'otp ni tugash vaqti'})
    @IsNotEmpty()
    expiration_time: Date;

    @ApiProperty({ example: 'false', description: 'otp ni tekwirilgani'})
    @IsNotEmpty()
    @IsBoolean()
    verified: boolean
}
