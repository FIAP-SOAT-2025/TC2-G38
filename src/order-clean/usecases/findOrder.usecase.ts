import { BaseException } from 'src/shared/exceptions/exceptions.base';
import OrderGatewayInterface from '../interfaces/gateways';
import Order from '../entities/order.entity';

export default class FindOrderByIdUseCase {
  constructor() {}
  static async findOrder(
    id: string,
    orderGateway: OrderGatewayInterface,
  ): Promise<Order> {
    const order = await orderGateway.findById(id);

    if (!order) {
      throw new BaseException(
        `Order with id ${id} not found`,
        404,
        'ORDER_NOT_FOUND',
      );
    }
    return order;
  }
}
