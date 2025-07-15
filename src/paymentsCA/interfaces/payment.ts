import { Payment } from "../domains/entities/payment.entity";
import { PaymentStatusEnum } from "../domains/enums/payment-status.enum";
import { PaymentTypeEnum } from "../shared/enums/payment-type.enum";

export interface PaymentRepositoryInterface {
  updateStatus( paymentId: string, status: PaymentStatusEnum ): Promise<Payment>;
  find(id: string): Promise<Payment>;
  create(
      orderId: string,
      type: PaymentTypeEnum,
      status: PaymentStatusEnum,
      mercadoPagoPaymentId: string,
      qrCode: string,
    ): Promise<Payment>;
}