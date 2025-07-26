import { Payment, PaymentStatusEnum } from "../domain/entities/payment.entity";
import { CallPaymentProviderGatewayInterface } from "../interfaces/call-payment-provider-gateway.interface";
import { PaymentGatewayInterface } from "../interfaces/payment-gateway.interface";
import { PaymentTypeEnum } from "../domain/enums/payment-type.enum";

export class CreatePaymentUseCase  {
  constructor() {}

  static async createPayment(
    paymentGateway: PaymentGatewayInterface,
    paymentProvider: CallPaymentProviderGatewayInterface,
    email: string,
    orderId: string,
    totalAmount: number
  ): Promise<Payment> {

    const provideResponse = await paymentProvider.callPaymentApi(totalAmount, email);
    const paymentId = String(provideResponse.id);
    const qrCode = provideResponse.point_of_interaction?.transaction_data?.qr_code;
    const status = (provideResponse.status.toUpperCase() as PaymentStatusEnum);
    const type = PaymentTypeEnum.PIX

    return paymentGateway.create( orderId, type, status, paymentId, qrCode);
  }
}
