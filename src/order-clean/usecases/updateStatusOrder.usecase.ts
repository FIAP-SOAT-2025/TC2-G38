import { OrderStatusEnum } from '../enums/orderStatus.enum';
import OrderGatewayInterface from '../interfaces/gateways';
import FindOrderUseCase from './findOrder.usecase';
// import UpdateItemInventoryUseCase from './updateItemInventory.usecase';

export default class UpdateStatusOrderUseCase {
  constructor() {}
  static async updateStatus(
    id: string,
    status: OrderStatusEnum,
    orderGateway: OrderGatewayInterface,
  ): Promise<{ message: string }> {
    const order = await FindOrderUseCase.findOrder(id, orderGateway);
    order.updateOrderStatus(status);

    await orderGateway.updateStatus(id, status);

    // if (status === OrderStatusEnum.RECEIVED) {
    //   await UpdateItemInventoryUseCase.updateItemInventory(order, null);
    // }

    return {
      message: `Order with ID ${id} updated successfully`,
    };
  }
}
