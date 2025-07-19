import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsNumber,
  ArrayNotEmpty,
  IsArray,
  IsInt,
} from 'class-validator';
import ItemCategoryEnum from '../../../entities/itemCategory.enum';

export class CreateItemDto {
  constructor(
    name: string,
    description: string,
    images: string[],
    price: number,
    quantity: number,
    category: ItemCategoryEnum,
  ) {
    this.name = name;
    this.description = description;
    this.images = images;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
  }

  @ApiProperty({
    description: 'Item name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  images: string[];

  @ApiProperty()
  @IsEnum(ItemCategoryEnum)
  @IsNotEmpty()
  category: ItemCategoryEnum;
}
