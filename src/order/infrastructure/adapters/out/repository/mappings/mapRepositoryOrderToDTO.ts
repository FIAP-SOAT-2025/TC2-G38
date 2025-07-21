import { Decimal } from '@prisma/client/runtime/library';
import {
  Order as PrismaOrder,
  OrderItem as PrismaOrderItem,
  Payment as PrismaPayment,
} from '@prisma/client';
import { mapPrismaPaymentToPaymentEntity } from 'src/payments/infraestructure/out/repository/mappings/mapPrismaPaymentToPaymentEntity';
import Order from 'src/order-clean/entities/order.entity';
import { OrderStatusEnum } from 'src/order-clean/enums/orderStatus.enum';

export function mapPrismaOrderToOrderResponse(
  prismaOrder: PrismaOrder,
  prismaItemOrder: PrismaOrderItem[],
  prismaPayment?: PrismaPayment,
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

  if (prismaPayment) {
    order.addPayment(mapPrismaPaymentToPaymentEntity(prismaPayment));
  }

  return order;
}
