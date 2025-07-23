import { Payment } from "../domains/entities/payment.entity";

export interface CallPaymentApiInterface {
  callPaymentApi(totalAmount: number, email: string): Promise<Payment>;
}
