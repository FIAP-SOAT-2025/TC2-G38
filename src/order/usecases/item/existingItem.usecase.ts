import ItemGatewayInterface from 'src/item/interfaces/itemGatewayInterface';

export default class ExistingItemUseCase {
  constructor() {}
  static async _getExistingItem(
    itemID: string,
    itemGateway: ItemGatewayInterface,
  ) {
    const item = await itemGateway.findByIdIfNotDeleted(itemID, false)
    if (!item) return null;
    return item;
  }
}
