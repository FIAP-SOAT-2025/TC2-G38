import { Inject, NotFoundException } from '@nestjs/common';
import OrderRepository from '../domain/repository/order.repository';
import { UpdateOrderServiceInterface } from '../domain/services/order.service.interface';
import { OrderStatusEnum } from '../domain/model/orderStatus';
import Order from '../domain/model/order.entity';
import { UpdateItemServiceInterface } from 'src/item/domain/services/item.service.interface';
import { OnEvent } from '@nestjs/event-emitter';

export default class UpdateOrderService implements UpdateOrderServiceInterface {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
    @Inject('UpdateItemServiceInterface')
    private readonly itemService: UpdateItemServiceInterface,
  ) {}

  @OnEvent('payment.approved')
  async handlePaymentApprovedEvent(payload: { orderId: string }) {
    await this.updateStatus(payload.orderId, OrderStatusEnum.RECEIVED);
  }

  async updateStatus(
    id: string,
    status: OrderStatusEnum,
  ): Promise<{ message: string }> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    order.updateOrderStatus(status);
    await this.orderRepository.updateStatus(id, status);
    if (status === OrderStatusEnum.RECEIVED) {
      await this.updateItemInventory(order);
    }
    return {
      message: `Order with ID ${id} updated successfully`,
    };
  }

  private async updateItemInventory(order: Order): Promise<void> {
    for (const item of order.orderItems) {
      if (this.itemService) {
        await this.itemService.updateQuantity(item._itemId, item._quantity);
      }
    }
  }
}
