
import Item from '../entities/item.entity';
import ItemGatewayInterface from '../interfaces/itemGatewayInterface';

export class DeleteItemUseCase {
  static async delete(id: string, itemGateway: ItemGatewayInterface): Promise<Item> {
    const item = await itemGateway.findByIdIfNotDeleted(id, false);
    
    if (!item) {
      throw new Error(`Item with ID ${id} not found`);
    }

   const deleteItem = await itemGateway.soft_delete(id);
   return  deleteItem;
    
  }
}


