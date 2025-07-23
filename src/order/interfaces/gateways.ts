import Order from '../entities/order.entity';
import { OrderStatusEnum } from '../enums/orderStatus.enum';
import { CompleteOrderResponse } from '../infraestructure/api/dto/orderResponse.dto';

export default interface OrderGatewayInterface {
  create(item: Order): Promise<Order>;
  findById(id: string): Promise<Order>;
  findAll(): Promise<Order[]>;
  updateStatus(id: string, status: OrderStatusEnum): Promise<Order>;
}
