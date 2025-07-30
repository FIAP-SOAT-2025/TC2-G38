
import Item from '../entities/item.entity';
import ItemGatewayInterface from '../interfaces/itemGatewayInterface';
import { UpdateItemInterface } from '../interfaces/updateItemInterface';
import ItemCategoryEnum from '../entities/itemCategory.enum';
import { BaseException } from 'src/shared/exceptions/exceptions.base';


export default class UpdateItemUseCase {
  constructor() {}
  static async update(id: string, item: Partial<UpdateItemInterface>, itemGateway: ItemGatewayInterface): Promise<Item> {
    if (!id || Object.keys(item).length === 0) {
      throw new BaseException(`Id not provided`, 404, 'ITEM_UPDATE_ERROR');
    }


    const existingItem = await itemGateway.findByIdIfNotDeleted(
        id,
      false,
    );

    if (!existingItem) {
      throw new BaseException(`Item with ID ${id} not found`, 404, 'ITEM_NOT_FOUND');
    }
    
    const updatedItem = new Item({
      id: existingItem.id,
      name: item.name ?? existingItem.name,
      description: item.description ?? existingItem.description,
      images: item.images ?? existingItem.images,
      price: item.price ?? existingItem.price,
      quantity: item.quantity ?? existingItem.quantity,
      category: (item.category as ItemCategoryEnum) ?? existingItem.category,
      createdAt: existingItem.createdAt,
      updatedAt: new Date(),
    });

     return await itemGateway.update(id, updatedItem);
  }
}
