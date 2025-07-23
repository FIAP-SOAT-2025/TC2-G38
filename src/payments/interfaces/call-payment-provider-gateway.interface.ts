import { Payment } from "../domains/entities/payment.entity";

export interface CallPaymentProviderGatewayInterface {
  callPaymentProvider(totalAmount: number, email: string): Promise<any>;
}
