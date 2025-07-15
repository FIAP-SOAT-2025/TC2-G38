export interface PaymentProviderInterface {
  callPaymentApi(orderId: string, totalAmount: number): Promise<any>;
}
