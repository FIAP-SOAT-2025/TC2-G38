import { Payment } from "../domains/entities/payment.entity";
import { PaymentTypeEnum } from "src/payments/domains/enums/payment-type.enum";
import { PaymentStatusEnum } from "src/payments/domains/enums/payment-status.enum";

export interface PaymentRepositoryInterface {
  create(
    orderId: string,
    type: PaymentTypeEnum,
    status: PaymentStatusEnum,
    mercadoPagoPaymentId: string,
    qrCode: string,
  ): Promise<Payment>;

  updateStatus( paymentId: string, status: PaymentStatusEnum ): Promise<Payment>;

  find(id: string): Promise<Payment>;

  getOrGenerateCustomerEmail(orderId: string): Promise<string>;
}