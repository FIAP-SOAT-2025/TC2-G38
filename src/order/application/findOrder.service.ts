import { Inject } from '@nestjs/common';
import OrderRepository from '../domain/repository/order.repository';
import { FindOrderServiceInterface } from '../domain/services/order.service.interface';
import { OrderMapper } from '../domain/mappings/mapEntityToResponseDto';
import { CompleteOrderResponse } from '../domain/dto/orderResponse.dto';

export default class FindOrderService implements FindOrderServiceInterface {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
  ) {}
  async findAll(): Promise<CompleteOrderResponse[]> {
    const order = await this.orderRepository.findAll();

    return order.map((order) =>
      OrderMapper.mapOrderEntityToFindOrderResponse(order),
    );
  }

  async find(orderId: string): Promise<CompleteOrderResponse> {
    const order = await this.orderRepository.findById(orderId);
    return OrderMapper.mapOrderEntityToFindOrderResponse(order);
  }
}
