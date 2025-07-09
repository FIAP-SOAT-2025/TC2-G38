import {
  Payment,
  PaymentStatusEnum,
  PaymentTypeEnum,
} from '../model/payment.entity';

export interface PaymentRepository {
  create(
    orderId: string,
    type: PaymentTypeEnum,
    status: PaymentStatusEnum,
    mercadoPagoPaymentId: string,
    qrCode: string,
  ): Promise<Payment>;

  updateStatus(paymentId: string, status: PaymentStatusEnum): Promise<Payment>;

  getOrGenerateCustomerEmail(orderId: string): Promise<string>;

  find(id: string): Promise<Payment>;
}

export default PaymentRepository;
