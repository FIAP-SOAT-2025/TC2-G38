
import Item from '../entities/item.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import ItemGatewayInterface from '../interfaces/itemGatewayInterface';
import { UpdateItemInterface } from '../interfaces/updateItemInterface';
import ItemCategoryEnum from '../entities/itemCategory.enum';
import { UpdateItemError, ItemNotFoundError } from '../entities/errors/item.errors';


export default class UpdateItemUseCase {
  constructor() {}
  static async update(id: string, item: Partial<UpdateItemInterface>, itemGateway: ItemGatewayInterface): Promise<Item> {
    if (!id || Object.keys(item).length === 0) {
      throw new UpdateItemError(id,'ID is required and at least one field must be provided for update');
    }


    const existingItem = await itemGateway.findByIdIfNotDeleted(
        id,
      false,
    );

    if (!existingItem) {
      throw new ItemNotFoundError(id);
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
