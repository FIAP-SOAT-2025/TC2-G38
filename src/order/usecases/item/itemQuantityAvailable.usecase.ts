import Item from 'src/item/entities/item.entity';

export default class ItemQuantityAvailableUseCase {
  constructor() {}
  static _isItemQuantityAvailable(item: Item, dtoQuantity: number): boolean {
    if (item.quantity < dtoQuantity) return false;
    return true;
  }
}
