import Item from '../../domain/model/item.entity';
import ItemRepository from '../../domain/repository/item.repository';
import { CreateItemServiceInterface } from '../../domain/services/item.service.interface';
import { CreateItemDto } from '../../domain/dto/createItem.dto';
import { Inject } from '@nestjs/common';

export default class CreateItemService implements CreateItemServiceInterface {
  constructor(
    @Inject('ItemRepository') private readonly itemRepository: ItemRepository,
  ) {}
  async create(itemData: CreateItemDto): Promise<Item> {
    return await this.itemRepository.create(itemData);
  }
}
