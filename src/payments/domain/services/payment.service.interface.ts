import { Payment, PaymentStatusEnum } from '../model/payment.entity';

export interface UpdatePaymentStatusServiceInterface {
  update(
    paymentId: string,
    status: PaymentStatusEnum,
  ): Promise<{ message: string }>;
}

export interface CreatePaymentServiceInterface {
  createPayment(orderId: string, totalAmount: number): Promise<Payment>;
}
