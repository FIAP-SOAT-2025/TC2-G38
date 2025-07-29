import { Payment }  from '../../domain/entities/payment.entity';

export function mapPrismaPaymentToPaymentEntity(prismaPayment: any): Payment {
  const payment = new Payment(prismaPayment.orderId, prismaPayment.type);
  payment.id = prismaPayment.id;
  payment.status = prismaPayment.status;
  payment.createdAt = prismaPayment.createdAt;
  payment.updatedAt = prismaPayment.updatedAt;
  payment.mercadoPagoPaymentId = prismaPayment.mercadoPagoPaymentId;
  payment.qrCode = prismaPayment.qrCode;
  return payment;
}