import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateHotelDto {

    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsString()
    city: string;

    @IsString()
    country: string;

    @IsString()
    description: string;

    @IsNumber()
    rating: number;

    @IsString()
    imageUrl: string;
}



export class UpdateHotelDto {

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    address: string;

    @IsOptional()   
    @IsString()
    city: string;

    @IsOptional()
    @IsString()
    country: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsNumber()
    rating: number;

    @IsOptional()
    @IsString()
    imageUrl: string;
}