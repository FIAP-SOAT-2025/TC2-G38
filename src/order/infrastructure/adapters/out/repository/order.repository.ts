import { Injectable, NotFoundException } from '@nestjs/common';
import OrderRepository from '../../../../domain/repository/order.repository';
import { PrismaService } from '../../../../../shared/infra/prisma.service';
import Order from '../../../../domain/model/order.entity';
import { mapPrismaOrderToOrderResponse } from './mappings/mapRepositoryOrderToDTO';
import { Payment, OrderStatus as PrismaOrderStatus } from '@prisma/client';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(order: Order): Promise<Order> {
    try {
      const createdRecord = await this.prisma.order.create({
        data: {
          id: order.id,
          status: order.status as PrismaOrderStatus,
          customerId: order.customerId,
          totalAmount: order.price,
        },
      });

      const createdItemOrder = await this.prisma.orderItem.createManyAndReturn({
        data: order.orderItems.map((item) => ({
          itemId: item._itemId,
          orderId: createdRecord.id,
          quantity: item._quantity,
          price: item._price,
        })),
        skipDuplicates: true,
      });

      throw new Error('not implemented');

      // return mapPrismaOrderToOrderResponse(createdRecord, createdItemOrder);
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  }

  async findById(id: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { orderItems: true, payment: true },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }
    throw new Error('not implemented');
    // return mapPrismaOrderToOrderResponse(
    //   order,
    //   order.orderItems,
    //   order.payment as Payment,
    // );
  }

  async findAll(): Promise<Order[]> {
    try {
      const orders = await this.prisma.order.findMany({
        include: { orderItems: true, payment: true },
      });
      throw new Error('not implemented');
      // return orders.map((order) =>
      //   mapPrismaOrderToOrderResponse(
      //     order,
      //     order.orderItems,
      //     order.payment as Payment,
      //   ),
      // );
    } catch (error) {
      console.error('Error finding all orders:', error);
      throw new Error('Failed to find orders');
    }
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    try {
      const updatedOrder = await this.prisma.order.update({
        where: { id },
        data: { status: status as PrismaOrderStatus },
        include: { orderItems: true },
      });

      // return new Order(up);
      throw new Error('not implemented');
      // return mapPrismaOrderToOrderResponse(
      //   updatedOrder,
      //   updatedOrder.orderItems,
      // );
    } catch (error) {
      console.error('Error updating order status:', error);
      throw new Error(`Failed to update order status for ${id}`);
    }
  }
}
