import { ApiProperty } from '@nestjs/swagger';
import {IsArray, IsNumber, IsOptional, IsString, IsUUID} from 'class-validator';
import { Transform } from 'class-transformer';
import {RoleEnum} from '../enum/role.enum';

export class GetAllEmployeesDto {
    @ApiProperty({ type: String, required: false })
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({ type: String, required: false })
    @IsString()
    @IsOptional()
    company: string;

    @ApiProperty({ type: String, required: false })
    @IsString()
    @IsOptional()
    project: string;

    @ApiProperty({ type: String, required: false })
    @IsString()
    @IsOptional()
    role: string;

    // @ApiProperty({
    //   enum: RoleEnum,
    //   example: RoleEnum.LEAD_ENGINEER,
    //   required: false
    // })
    // roles: string;

    @ApiProperty({ type: Number, example: 0, required: false })
    @Transform(({ value }) => Number(value) || null)
    @IsNumber()
    @IsOptional()
    offset: number;

    @ApiProperty({ type: Number, example: 10, required: false })
    @Transform(({ value }) => Number(value) || null)
    @IsNumber()
    @IsOptional()
    limit: number;
}
