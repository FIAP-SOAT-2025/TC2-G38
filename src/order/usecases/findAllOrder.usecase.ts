import Order from '../entities/order.entity';
import { CompleteOrderResponse } from '../infraestructure/api/dto/orderResponse.dto';
import OrderGatewayInterface from '../interfaces/gateways';
import { mapPrismaOrderToOrderResponse } from '../presenters/order.presenter';
import { OrderMapper } from '../presenters/orderMap';

export default class FindAllOrderUseCase {
  constructor() {}
  static async findAll(orderGateway: OrderGatewayInterface): Promise<Order[]> {
    const order = await orderGateway.findAll();
    return order;
  }
}
