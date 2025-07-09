import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import Item from 'src/item/domain/model/item.entity';
import ItemCategoryEnum from 'src/item/domain/model/itemCategory.enum';
import ItemRepository from 'src/item/domain/repository/item.repository';
import { FindItemServiceInterface } from 'src/item/domain/services/item.service.interface';

export default class FindItemService implements FindItemServiceInterface {
  constructor(
    @Inject('ItemRepository') private readonly itemRepository: ItemRepository,
  ) {}

  async findByCategory(category: ItemCategoryEnum): Promise<Item[] | null> {
    const validCategories = Object.values(ItemCategoryEnum);
    if (!validCategories.includes(category)) {
      throw new BadRequestException(
        `Invalid category. Expected values: ${validCategories.join(', ')}`,
      );
    }
    return await this.itemRepository.findByCategory(category);
  }

  async findById(id: string): Promise<Item | null> {
    try {
      return await this.itemRepository.findByIdIfNotDeleted(id, false);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new NotFoundException(`Item with ID ${id} not found.`);
      }
      throw error;
    }
  }
}
