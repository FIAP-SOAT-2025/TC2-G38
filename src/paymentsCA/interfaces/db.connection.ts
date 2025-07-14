import { Payment } from "../controllers/entities/payment.entity";
import { PaymentStatusEnum } from "../shared/enums/payment-status.enum";

export interface DbConnection {
  updateStatus( paymentId: string, status: PaymentStatusEnum ): Promise<Payment>;
  find(id: string): Promise<Payment>;
}