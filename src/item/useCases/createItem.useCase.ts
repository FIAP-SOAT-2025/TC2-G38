import Item from "../entities/item.entity";
import { CreateItemInterface } from "../interfaces/createItemInterface";
import ItemGatewayInterface from "../interfaces/itemGatewayInterface";


export default class CreateItemUseCase {
  constructor() {}
  static async create(itemData: CreateItemInterface, itemGateway: ItemGatewayInterface): Promise<Item> {
    const item = await itemGateway.create(itemData);
    const createdItem = new Item(item)
    return createdItem;
  }
}
