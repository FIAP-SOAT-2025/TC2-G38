import { Payment as PrismaPayment } from '@prisma/client';
import { Payment, PaymentStatusEnum, PaymentTypeEnum } from 'src/payments/domain/model/payment.entity';

export function mapPrismaPaymentToPaymentEntity(prismaPayment: PrismaPayment): Payment {
  const payment = new Payment(prismaPayment.orderId, prismaPayment.type as PaymentTypeEnum);

  payment.id = prismaPayment.id;
  payment.status = prismaPayment.status as PaymentStatusEnum;
  payment.mercadoPagoPaymentId = prismaPayment.mercadoPagoPaymentId ?? undefined;
  payment.qrCode = prismaPayment.qrCode ?? undefined;
  payment.createdAt = (prismaPayment as any).createdAt;
  payment.updatedAt = (prismaPayment as any).updatedAt;

  return payment;
}