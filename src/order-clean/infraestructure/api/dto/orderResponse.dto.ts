import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentResponse } from 'src/payments/infrastructure/api/dto/payment-response.dto';

export class OrderResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  totalAmount: number;

  @ApiPropertyOptional()
  customerId?: string | null;

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;
}

export class OrderItemResponse {
  @ApiProperty()
  itemId: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  price: number;
}
export class CompleteOrderResponse extends OrderResponse {
  @ApiProperty({ type: [OrderItemResponse] })
  orderItems: OrderItemResponse[];

  // @ApiProperty({ type: [PaymentResponse] })
  // payment?: PaymentResponse;
}
