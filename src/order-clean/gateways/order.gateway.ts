import { OrderMapper } from 'src/order/domain/mappings/mapEntityToResponseDto';
import Order from '../entities/order.entity';
import { OrderStatusEnum } from '../enums/orderStatus.enum';
import OrderGatewayInterface from '../interfaces/gateways';

export class OrderGateway implements OrderGatewayInterface {
  constructor(private readonly orderRepository: OrderGatewayInterface) {}

  create(item: Order): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  async findById(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    return OrderMapper.mapOrderEntityToFindOrderResponse(order);
  }
  async findAll(): Promise<Order[]> {
    const order = await this.orderRepository.findAll();

    return order.map((order) =>
      OrderMapper.mapOrderEntityToFindOrderResponse(order),
    );
  }
  updateStatus(id: string, status: OrderStatusEnum): Promise<Order> {
    throw new Error('Method not implemented.');
  }
}
