import { Payment } from "../domains/entities/payment.entity";

export interface CreatePaymentServiceInterface {
  createPayment(orderId: string, totalAmount: number): Promise<Payment>;
}
