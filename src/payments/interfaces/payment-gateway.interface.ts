import { Payment } from "../domain/entities/payment.entity";
import { PaymentTypeEnum } from "src/payments/domain/enums/payment-type.enum";
import { PaymentStatusEnum } from "src/payments/domain/enums/payment-status.enum";

export interface PaymentGatewayInterface {
  create(
    orderId: string,
    type: PaymentTypeEnum,
    status: PaymentStatusEnum,
    mercadoPagoPaymentId: string,
    qrCode: string,
  ): Promise<Payment>;

  updatePaymentStatus( paymentId: string, status: PaymentStatusEnum ): Promise<Payment>;

  find(id: string): Promise<Payment>;
}