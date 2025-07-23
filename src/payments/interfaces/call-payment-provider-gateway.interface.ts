import { Payment } from "../domains/entities/payment.entity";

export interface CallPaymentProviderGatewayInterface {
  callPaymentProvider(orderId: string, totalAmount: number): Promise<any>;
}
