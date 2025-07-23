import { Payment } from "../domains/entities/payment.entity";

export interface CallPaymentApiInterface {
  callPaymentApi(orderId: string, totalAmount: number): Promise<Payment>;
}
