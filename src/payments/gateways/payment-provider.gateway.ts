import { CallPaymentApiInterface } from "../interfaces/call-payment-api.interface";
import { CallPaymentProviderGatewayInterface } from "../interfaces/call-payment-provider-gateway.interface";

export class PaymentProviderGateway implements CallPaymentProviderGatewayInterface {
  constructor(
    private readonly paymentProvider: CallPaymentApiInterface
   ) {}
 
  async callPaymentProvider(
    orderId: string,
    totalAmount: number
  ){
    return await this.paymentProvider.callPaymentApi(
      orderId,
      totalAmount,
    );
  }
}