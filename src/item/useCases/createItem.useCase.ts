import { BaseException } from "src/shared/exceptions/exceptions.base";
import Item from "../entities/item.entity";
import { CreateItemInterface } from "../interfaces/createItemInterface";
import ItemGatewayInterface from "../interfaces/itemGatewayInterface";


export default class CreateItemUseCase {
  constructor() {}
  static async create(itemData: CreateItemInterface, itemGateway: ItemGatewayInterface): Promise<Item> {
    const createdItem = new Item(itemData) 
    const itemExists = await itemGateway.findByNameAndDescription(itemData.name, itemData.description);
      if (itemExists) {
        throw new BaseException('Item already exists. To adjust the quantity, use the edit option.', 400, 'ITEM_ALREADY_EXISTS');
      }
    
    
    return await itemGateway.create(createdItem);
  }
}
