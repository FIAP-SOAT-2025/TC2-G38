import Order from '../model/order.entity';
import { OrderStatusEnum } from '../model/orderStatus';

export default interface OrderRepository {
  create(item: Order): Promise<Order>;
  findById(id: string): Promise<Order>;
  findAll(): Promise<Order[]>;
  updateStatus(id: string, status: OrderStatusEnum): Promise<Order>;
}
