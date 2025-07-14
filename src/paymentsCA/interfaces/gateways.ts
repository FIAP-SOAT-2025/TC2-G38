import { Payment } from "../controllers/entities/payment.entity";
import { PaymentStatusEnum } from "../shared/enums/payment-status.enum";

export default interface PaymentGatewayInterface {
  find(id: string): Promise<Payment>;
  updateStatus(paymentId: string, status: PaymentStatusEnum):  Promise<Payment> ;
}