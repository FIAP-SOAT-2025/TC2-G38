import { Injectable, NotFoundException } from '@nestjs/common';
import OrderGatewayInterface from 'src/order/interfaces/gateways';
import { PrismaService } from 'src/shared/infra/prisma.service';

import Order from 'src/order/entities/order.entity';
import { CompleteOrderResponse } from '../api/dto/orderResponse.dto';
import { mapPrismaOrderToOrderResponse } from 'src/order/presenters/order.presenter';
import { OrderMapper } from 'src/order/presenters/orderMap';
import { UpdateStatusDto } from 'src/payments/infrastructure/api/dto/update-status.dto';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class PrismaOrderRepository implements OrderGatewayInterface {
  constructor(private readonly prisma: PrismaService) { }

  async create(order: Order): Promise<Order> {
    try {
      const createdRecord = await this.prisma.order.create({
        data: {
          id: order.id,
          status: order.status,
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

      return mapPrismaOrderToOrderResponse(createdRecord, createdItemOrder);
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

    return mapPrismaOrderToOrderResponse(order, order.orderItems);
  }

  async findAll(): Promise<any> {
    try {
      return await this.prisma.$queryRaw`
        SELECT * FROM "Order" as o
        INNER JOIN "OrderItem" as oi
        ON oi."orderId" = o.id
        WHERE o.status
        IN ('READY', 'PREPARING', 'RECEIVED')
        ORDER BY
        CASE o.status
          WHEN 'READY' THEN 1
          WHEN 'PREPARING' THEN 2
          WHEN 'RECEIVED' THEN 3
        END,  
        o."createdAt" ASC;
      `;
    } catch (error) {
      console.error('Error finding all orders:', error);
      throw new Error('Failed to find orders');
    }
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    try {
      const updatedOrder = await this.prisma.order.update({
        where: { id },
        data: { status: status as OrderStatus },
        include: { orderItems: true },
      });

      return mapPrismaOrderToOrderResponse(
        updatedOrder,
        updatedOrder.orderItems,
      );
    } catch (error) {
      console.error('Error updating order status:', error);
      throw new Error(`Failed to update order status for ${id}`);
    }
  }
}
