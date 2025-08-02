import { BaseException } from 'src/shared/exceptions/exceptions.base';
import OrderGatewayInterface from '../interfaces/gateways';
import Order, { OrderProps } from '../entities/order.entity';

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

    const orderFinal = new Order(order as unknown as OrderProps);

    if (orderFinal.payment) {
      orderFinal.addPayment(orderFinal.payment);
    }

    return orderFinal;
  }
}
