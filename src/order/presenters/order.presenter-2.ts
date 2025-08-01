import Order from '../entities/order.entity';
import OrderItemInterface from '../interfaces/order-item.interface';
import OrderInterface from '../interfaces/order.interface';

export class OrderPresenter {
  constructor() {}

  static formatOrderToJson(
    order: Order,
    items: OrderItemInterface[],
  ): OrderInterface {
    return {
      id: order.id,
      status: order.status,
      totalAmount: order.price,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      customerId: order.customerId ?? undefined,
      orderItems: items.map((item) => ({
        itemId: item.itemId,
        quantity: item.quantity,
        price: item.price,
      })),
    };
  }
}
