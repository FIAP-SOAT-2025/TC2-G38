import { Payment } from "../domains/entities/payment.entity";
import { PaymentStatusEnum } from "../domains/enums/payment-status.enum";

export interface UpdatePaymentGatewayInterface {
  find(id: string): Promise<Payment>;
  updateStatus(paymentId: string, status: PaymentStatusEnum):  Promise<Payment>;
}