import { OrderStatusEnum } from '../enums/orderStatus.enum';
import OrderGatewayInterface from '../interfaces/gateways';
import FindOrderUseCase from './findOrder.usecase';
import ItemGatewayInterface from 'src/item/interfaces/itemGatewayInterface';
import UpdateQuantityItemUseCase from 'src/item/useCases/updateQuantityItem.usecase';

export default class UpdateStatusOrderUseCase {
  constructor() {}
  static async updateStatusOrder(
    id: string,
    status: OrderStatusEnum,
    orderGateway: OrderGatewayInterface,
    itemGateway: ItemGatewayInterface,
  ): Promise<{ message: string }> {
    const order = await FindOrderUseCase.findOrder(id, orderGateway);
    order.updateOrderStatus(status);

    await orderGateway.updateStatus(id, status);

    if (status === OrderStatusEnum.RECEIVED) {
      for (const item of order.orderItems) {
        await UpdateQuantityItemUseCase.updateQuantity(
          item._itemId,
          item._quantity,
          itemGateway,
        );
      }
    }
    return {
      message: `Order with ID ${id} updated successfully`,
    };
  }
}
