import Item from 'src/item/entities/item.entity';
import ExistingItemUseCase from './item/existingItem.usecase';
import ItemGatewayInterface from 'src/item/interfaces/itemGatewayInterface';
import { BaseException } from 'src/shared/exceptions/exceptions.base';
import ItemQuantityAvailableUseCase from './item/itemQuantityAvailable.usecase';
import OrderItemInterface from '../interfaces/order-item.interface';

export default class ValidItemOrderUseCase {
  constructor() {}
  static async validItemOrderUseCase(
    itemGateway: ItemGatewayInterface,
    orderItemDto: OrderItemInterface,
  ): Promise<Item> {
    const item = await ExistingItemUseCase._getExistingItem(
      orderItemDto.itemId,
      itemGateway,
    );

    if (!item) {
      throw new BaseException('Not Found Item', 404, 'NOT_FOUND_ITEM');
    }

    const isItemQuantityValid =
      ItemQuantityAvailableUseCase._isItemQuantityAvailable(
        item,
        orderItemDto.itemQuantity || 0,
      );

    if (!isItemQuantityValid) {
      throw new BaseException(
        `Failed to create order: Item with ID ${orderItemDto.itemId} does not have enough quantity. Quantity: ${item.quantity}`,
        400,
        'ITEM_NOT_AVAILABLE',
      );
    }

    return item;
  }
}
