import { Payment } from "../domains/entities/payment.entity";
import { PaymentProviderInterface } from "./payment-provider.interface";

export interface CreatePaymentGatewayInterface {
  createPayment(paymentProvider: PaymentProviderInterface, orderId: string, totalAmount: number): Promise<Payment>;
}
