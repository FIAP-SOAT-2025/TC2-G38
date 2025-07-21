import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatusEnum } from 'src/order-clean/enums/orderStatus.enum';

export class UpdateOrderStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(OrderStatusEnum)
  status: OrderStatusEnum;
}
