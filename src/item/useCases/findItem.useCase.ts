import ItemCategoryEnum from "../entities/itemCategory.enum";
import { BadRequestException, NotFoundException} from '@nestjs/common';
import Item from "../entities/item.entity";
import ItemGatewayInterface from "../interfaces/itemGatewayInterface";

export default class FindItemUseCase {
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
