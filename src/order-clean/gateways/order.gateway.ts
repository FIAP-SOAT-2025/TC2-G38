import { OrderMapper } from 'src/order/domain/mappings/mapEntityToResponseDto';
import Order from '../entities/order.entity';
import { OrderStatusEnum } from '../enums/orderStatus.enum';
import OrderGatewayInterface from '../interfaces/gateways';
import { CompleteOrderResponse } from '../infraestructure/api/dto/orderResponse.dto';

export class OrderGateway implements OrderGatewayInterface {
  constructor(private readonly orderRepository: OrderGatewayInterface) {}

  create(item: Order): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  async findById(id: string): Promise<CompleteOrderResponse> {
    const order = await this.orderRepository.findById(id);
    return order;
  }

  async findAll(): Promise<Order[]> {
    const order = await this.orderRepository.findAll();
    return order;
  }

  async updateStatus(
    id: string,
    status: OrderStatusEnum,
  ): Promise<CompleteOrderResponse> {
    await this.orderRepository.updateStatus(id, status);
    return this.findById(id);
  }
}
