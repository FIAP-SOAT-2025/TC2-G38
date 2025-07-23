import Item from 'src/item/entities/item.entity';

export default class ItemQuantityAvailableUseCase {
  constructor() {}
  static async _isItemQuantityAvailable(
    item: Item,
    dtoQuantity: number,
  ) {
    if (item.quantity < dtoQuantity) return false;
    return true;
  }
}
