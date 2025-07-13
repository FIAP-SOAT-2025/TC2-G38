import { Payment } from "../entities/payment.entity";
import { PaymentStatusEnum } from "../shared/enums/payment-status.enum";

export interface PrismaConnection {
  updateStatus( paymentId: string, status: PaymentStatusEnum ): Promise<Payment>;
}