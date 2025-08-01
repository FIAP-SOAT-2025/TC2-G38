import Item from 'src/item/entities/item.entity';
import OrderItemInterface from '../interfaces/order-item.interface';

export default class OrderItemPresenter {
  constructor() {}

  static formatOrderItemToJson(item: Item): OrderItemInterface {
    return {
      itemId: item.id || '',
      quantity: item.quantity,
      price: item.price,
    };
  }
}
