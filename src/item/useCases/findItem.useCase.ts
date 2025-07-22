import ItemCategoryEnum from "../entities/itemCategory.enum";
import { BadRequestException, NotFoundException} from '@nestjs/common';
import Item from "../entities/item.entity";
import ItemGatewayInterface from "../interfaces/itemGatewayInterface";

export default class FindItemUseCase {
static async findByCategory(category: ItemCategoryEnum, itemGateway: ItemGatewayInterface): Promise<Item[] | null> {
   
  const validCategories = Object.values(ItemCategoryEnum);
    if (!validCategories.includes(category)) {
      throw new BadRequestException(
        `Invalid category. Expected values: ${validCategories.join(', ')}`,
      );
    }
     
    const items = await itemGateway.findByCategory(category);

    return items.map(item => new Item(item));
  }

 static async findById(id: string,  itemGateway: ItemGatewayInterface): Promise<Item | null> {
      try {
        const DeleteItem = await itemGateway.findByIdIfNotDeleted(id, false);
        return new Item(DeleteItem); 
      } catch (error) {
        if (error instanceof BadRequestException) {
          throw new NotFoundException(`Item with ID ${id} not found.`);
        }
        throw error;
      }
    }

} 
