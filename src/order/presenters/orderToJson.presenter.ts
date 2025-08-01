import Order from '../entities/order.entity';
import { OrderItem } from '../entities/orderItem.entity';
import OrderItemInterface from '../interfaces/order-item.interface';
import OrderInterface from '../interfaces/order.interface';

export default class OrderPresenter {
  constructor() {}

  static formatOrderToJson(order: Order, items: OrderItem[]): OrderInterface {
    return {
      id: order.id,
      status: order.status,
      totalAmount: order.price,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      customerId: order.customerId ?? undefined,
      orderItems: items.map((item) => ({
        itemId: item._itemId,
        quantity: item._quantity,
        price: item._price,
      })),
    };
  }
}
