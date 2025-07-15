import { Payment } from "../domains/entities/payment.entity";
import { PaymentStatusEnum } from "../domains/enums/payment-status.enum";

export interface PaymentInterface {
  updateStatus( paymentId: string, status: PaymentStatusEnum ): Promise<Payment>;
  find(id: string): Promise<Payment>;
}