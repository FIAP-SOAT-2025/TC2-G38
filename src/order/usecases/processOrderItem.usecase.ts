import ItemGatewayInterface from 'src/item/interfaces/itemGatewayInterface';
import ValidItemOrderUseCase from './validItemOrder.usecase';
import { OrderItemProps } from '../entities/orderItem.entity';
import OrderInterface from '../interfaces/order.interface';

export default class ProccessOrderItemUseCase {
  constructor() {}
  static async proccessOrderItem(
    order: OrderInterface,
    itemGateway: ItemGatewayInterface,
  ) {
    const processedOrderItems: OrderItemProps[] = [];

    if (order.orderItems) {
      for (const orderItem of order.orderItems) {
        const { id, price } = await ValidItemOrderUseCase.validItemOrderUseCase(
          itemGateway,
          orderItem,
        );

        processedOrderItems.push({
          itemId: id as string,
          quantity: orderItem.itemQuantity || 0,
          price,
        });
      }
    }

    return processedOrderItems;
  }
}
