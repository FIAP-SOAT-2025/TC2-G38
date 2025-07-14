export interface PaymentProvider {
  callPaymentApi(orderId: string, totalAmount: number): Promise<any>;
}
