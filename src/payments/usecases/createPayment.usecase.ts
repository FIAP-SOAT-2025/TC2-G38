import { Payment, PaymentStatusEnum } from "../domains/entities/payment.entity";
import { CreatePaymentGatewayInterface } from "../interfaces/create-payment-gateway.interface";
import { CallPaymentProviderGatewayInterface } from "../interfaces/call-payment-provider-gateway.interface";
import { GenerateEmailGatewayInterface } from "../interfaces/generate-email-gateway.interface";

export class CreatePaymentUseCase  {
  constructor() {}

  static async createPayment(
    paymentGateway: CreatePaymentGatewayInterface,
    paymentProvider: CallPaymentProviderGatewayInterface,
    //emailGateway: GenerateEmailGatewayInterface,
    email: string,
    orderId: string,
    totalAmount: number
  ): Promise<Payment> {

   // const email = await emailGateway.generateEmail(orderId);
    const provideResponse = await paymentProvider.callPaymentProvider(totalAmount, email);

    const paymentId = String(provideResponse.id);
    const qrCode = provideResponse.point_of_interaction?.transaction_data?.qr_code;
    const status = (provideResponse.status.toUpperCase() as PaymentStatusEnum);

    return paymentGateway.createPayment( paymentId, qrCode, status, orderId );
  }
}
