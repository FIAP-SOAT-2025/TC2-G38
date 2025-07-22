import { Payment } from "../domains/entities/payment.entity";
import { PaymentProviderInterface } from "../interfaces/payment-provider.interface";
import { CreatePaymentGatewayInterface } from "../interfaces/create-payment-gateway.interface";

export class CreatePaymentUseCase  {
  constructor(
    private readonly paymentProvider: PaymentProviderInterface
  ) {}

  async createPayment(
    paymentGateway: CreatePaymentGatewayInterface,
    orderId: string,
    totalAmount: number
  ): Promise<Payment> {
    return paymentGateway.createPayment(this.paymentProvider,  orderId, totalAmount);
  }
}
