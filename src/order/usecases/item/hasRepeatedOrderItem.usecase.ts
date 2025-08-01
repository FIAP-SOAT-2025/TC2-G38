import OrderItemInterface from 'src/order/interfaces/order-item.interface';

export default class HasRepeatedOrderItemIdsUseCase {
  constructor() {}
  static hasRepeatedOrderItemIds(orderItems: OrderItemInterface[]): boolean {
    const seen = new Set<string>();

    for (const { itemId } of orderItems) {
      if (seen.has(itemId)) return true;
      seen.add(itemId);
    }

    return false;
  }
}
