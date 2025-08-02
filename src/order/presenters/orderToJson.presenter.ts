import Order from '../entities/order.entity';
import OrderInterface from '../interfaces/order.interface';

export default class OrderPresenter {
  constructor() {}

  static formatOrderToJson(order: Order): OrderInterface {
    return {
      id: order.id,
      status: order.status,
      totalAmount: order.price,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      customerId: order.customerId ?? undefined,
      orderItems: order.orderItems.map((item) => ({
        itemId: item.itemId,
        quantity: item.quantity,
        price: item.price,
      })),
    };
  }
}
