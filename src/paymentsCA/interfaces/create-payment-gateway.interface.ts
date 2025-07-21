import { Payment } from "../domains/entities/payment.entity";

export interface CreatePaymentGatewayInterface {
  createPayment(orderId: string, totalAmount: number): Promise<Payment>;
}
