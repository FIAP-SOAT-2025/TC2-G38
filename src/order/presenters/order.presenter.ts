import { Decimal } from '@prisma/client/runtime/library';
import {
  Order as PrismaOrder,
  OrderItem as PrismaOrderItem,
} from '@prisma/client';
import Order from '../entities/order.entity';
import { OrderStatusEnum } from '../enums/orderStatus.enum';

export function mapPrismaOrderToOrderResponse(
  prismaOrder: PrismaOrder,
  prismaItemOrder: PrismaOrderItem[],
): Order {
  const order = new Order({
    id: prismaOrder.id,
    status: prismaOrder.status as OrderStatusEnum,
    price:
      prismaOrder.totalAmount instanceof Decimal
        ? prismaOrder.totalAmount.toNumber()
        : prismaOrder.totalAmount,
    createdAt: prismaOrder.createdAt,
    updatedAt: prismaOrder.updatedAt,
    customerId: prismaOrder.customerId ?? undefined,
    orderItems: prismaItemOrder.map((item) => ({
      itemId: item.itemId,
      quantity: item.quantity,
      price: item.price instanceof Decimal ? item.price.toNumber() : item.price,
    })),
  });

  //   if (prismaPayment) {
  //     order.addPayment(mapPrismaPaymentToPaymentEntity(prismaPayment));
  //   }

  return order;
}
