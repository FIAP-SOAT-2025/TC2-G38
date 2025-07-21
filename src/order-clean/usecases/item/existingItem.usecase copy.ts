import { OrderItemDto } from 'src/order-clean/infraestructure/api/dto/order.dto';

export default class HasRepeatedOrderItemIdsUseCase {
  constructor() {}
  static hasRepeatedOrderItemIds(orderItems: OrderItemDto[]): boolean {
    const seen = new Set<string>();

    for (const { itemId } of orderItems) {
      if (seen.has(itemId)) return true;
      seen.add(itemId);
    }

    return false;
  }
}
