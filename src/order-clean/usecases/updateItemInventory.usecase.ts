import { UpdateItemServiceInterface } from 'src/item/domain/services/item.service.interface';
import Order from '../entities/order.entity';

export default class UpdateItemInventoryUseCase {
  constructor() {}
  static async updateItemInventory(
    order: Order,
    itemGateway: UpdateItemServiceInterface,
  ): Promise<void> {
    for (const item of order.orderItems) {
      await itemGateway.updateQuantity(item._itemId, item._quantity);
    }
  }
}
