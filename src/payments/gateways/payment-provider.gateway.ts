import { CallPaymentProviderGatewayInterface } from "../interfaces/call-payment-provider-gateway.interface";

export class PaymentProviderGateway implements CallPaymentProviderGatewayInterface {
  constructor(
    private readonly paymentProvider: CallPaymentProviderGatewayInterface
   ) {}
 
  async callPaymentApi(
    totalAmount: number,
    email: string,
  ){
    return await this.paymentProvider.callPaymentApi(
      totalAmount,
      email,
    );
  }
}