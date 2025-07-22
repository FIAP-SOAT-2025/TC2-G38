import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  IsNotEmpty,
  IsInt,
} from 'class-validator';
import ItemCategoryEnum from '../../../entities/itemCategory.enum';

export class UpdateItemDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  images: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  price: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  quantity: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(ItemCategoryEnum)
  category: ItemCategoryEnum;
}
