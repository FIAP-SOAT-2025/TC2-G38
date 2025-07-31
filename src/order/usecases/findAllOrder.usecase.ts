import Order from '../entities/order.entity';
import OrderGatewayInterface from '../interfaces/gateways';
export default class FindAllOrderUseCase {
  constructor() {}
  static async findAll(orderGateway: OrderGatewayInterface): Promise<Order[]> {
    const order = await orderGateway.findAll();
    return order;
  }
}
