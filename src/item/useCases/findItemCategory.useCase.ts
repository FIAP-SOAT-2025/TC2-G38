import ItemCategoryEnum from "../entities/itemCategory.enum";
import Item from "../entities/item.entity";
import ItemGatewayInterface from "../interfaces/itemGatewayInterface";
import { BaseException } from "src/shared/exceptions/exceptions.base";

export default class FindItemCategoryUseCase {
static async findByCategory(category: ItemCategoryEnum, itemGateway: ItemGatewayInterface): Promise<Item[] | null> {
   
  const validCategories = Object.values(ItemCategoryEnum);
    if (!validCategories.includes(category)) {
      throw new BaseException(
        `Invalid category. Expected values: ${validCategories.join(', ')}`,409, 'ITEM_CATEGORY_ERROR'
      );
    }
     
    const items = await itemGateway.findByCategory(category);

    return items.map(item => new Item(item));
  }
} 
