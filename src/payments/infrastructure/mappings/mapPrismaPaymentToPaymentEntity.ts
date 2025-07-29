import { Payment as PrismaPayment } from '@prisma/client';
import { Payment, PaymentStatusEnum } from 'src/payments/domain/entities/payment.entity';
import { PaymentTypeEnum } from 'src/payments/domain/enums/payment-type.enum';

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