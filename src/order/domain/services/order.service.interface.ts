import { Payment } from 'src/payments/domains/entities/payment.entity';
import { OrderDto } from '../dto/order.dto';
import { OrderResponse } from '../dto/orderResponse.dto';
import { OrderStatusEnum } from '../model/orderStatus';

export interface ProcessOrderServiceInterface {
  process(order: OrderDto): Promise<{ order: OrderResponse; payment: Payment }>;
}

export interface FindOrderServiceInterface {
  findAll(): Promise<OrderResponse[]>;
  find(orderId: string): Promise<OrderResponse>;
}

export interface UpdateOrderServiceInterface {
  updateStatus(
    orderId: string,
    status: OrderStatusEnum,
  ): Promise<{ message: string }>;
}
