import { Payment } from "../entities/payment.entity";
import { PaymentStatusEnum } from "../shared/enums/payment-status.enum";

export default interface PaymentGatewayInterface {
  updateStatus(paymentId: string, status: PaymentStatusEnum):Promise<Payment>;
}