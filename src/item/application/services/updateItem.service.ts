import { UpdateItemDto } from 'src/item/domain/dto/updateItem.dto';
import Item from '../../domain/model/item.entity';
import ItemRepository from '../../domain/repository/item.repository';
import { UpdateItemServiceInterface } from '../../domain/services/item.service.interface';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import ItemCategoryEnum from 'src/item/domain/model/itemCategory.enum';

export default class UpdateItemService implements UpdateItemServiceInterface {
  constructor(
    @Inject('ItemRepository') private readonly itemRepository: ItemRepository,
  ) {}
  async update(id: string, item: Partial<UpdateItemDto>): Promise<Item> {
    if (!id || Object.keys(item).length === 0) {
      throw new BadRequestException('No fields to update');
    }

    const existingItem = await this.itemRepository.findByIdIfNotDeleted(
      id,
      false,
    );

    if (!existingItem) {
      throw new NotFoundException(`Item with ID ${id} not found`);
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

    return await this.itemRepository.update(id, updatedItem);
  }

  async updateQuantity(
    id: string,
    quantityToRemoveFromItemInventory: number,
  ): Promise<Item> {
    const existingItem = await this.itemRepository.findById(id);

    if (!existingItem) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    existingItem.updateItemQuantity(quantityToRemoveFromItemInventory);
    return await this.itemRepository.update(id, existingItem);
  }
}
