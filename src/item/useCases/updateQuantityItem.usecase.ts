import { NotFoundException } from '@nestjs/common';
import Item from '../entities/item.entity';
import ItemGatewayInterface from '../interfaces/itemGatewayInterface';
import FindItemUseCase from './findItem.useCase';
import UpdateItemUseCase from './updateItem.useCase';
import { BaseException } from 'src/shared/exceptions/exceptions.base';

export default class UpdateQuantityItemUseCase {
  constructor() {}
  static async updateQuantity(
    id: string,
    quantityToRemoveFromItemInventory: number,
    itemGateway: ItemGatewayInterface,
  ): Promise<Item> {
    const existingItem = await FindItemUseCase.findById(id, itemGateway);

    if (!existingItem) {
      throw new BaseException(
        `Item with ID ${id} not found`,
        400,
        'NOT_FOUND_ITEM',
      );
    }

    existingItem.updateItemQuantity(quantityToRemoveFromItemInventory);

    const item = await UpdateItemUseCase.update(id, existingItem, itemGateway);
    return item;
  }
}
