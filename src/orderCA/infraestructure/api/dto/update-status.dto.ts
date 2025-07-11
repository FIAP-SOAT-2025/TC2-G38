import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
//import { OrderStatusEnum } from '../model/order-status'; => COMO USAR ISSO?

export class UpdateOrderStatusDto {
 // @ApiProperty()
 // @IsNotEmpty()
 // @IsEnum(OrderStatusEnum)
 // status: OrderStatusEnum;
}
