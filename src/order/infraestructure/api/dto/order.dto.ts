import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  ValidateNested,
  IsOptional,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import OrderInterface from 'src/order/interfaces/order.interface';

export class OrderItemDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  itemId: string;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  itemQuantity: number;
}

export class OrderDto implements OrderInterface {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  customerCpf?: string;
  @ApiProperty({
    description: 'Order items',
    type: [OrderItemDto],
    example: [
      {
        itemId: 'id1',
        itemQuantity: 2,
      },
      {
        itemId: 'id2',
        itemQuantity: 1,
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];
}
