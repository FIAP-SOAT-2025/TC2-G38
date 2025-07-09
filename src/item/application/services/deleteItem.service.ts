import { Inject } from '@nestjs/common';
import ItemRepository from '../../../item/domain/repository/item.repository';
import { DeleteItemServiceInterface } from '../../../item/domain/services/item.service.interface';
import Item from '../../../item/domain/model/item.entity';

export default class DeleteItemService implements DeleteItemServiceInterface {
  constructor(
    @Inject('ItemRepository') private readonly itemRepository: ItemRepository,
  ) {}

  async delete(id: string): Promise<{ message: string }> {
     const item = await this.itemRepository.findByIdIfNotDeleted(id, false);
     
     if (!item) {
        throw new Error(`Item with ID ${id} not found`);
      }

     await this.itemRepository.soft_delete(id);
     return {
       'message': `Item with ID ${id} deleted successfully`,
     }
  }
}
