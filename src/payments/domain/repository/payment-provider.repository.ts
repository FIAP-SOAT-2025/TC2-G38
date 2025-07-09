export interface PaymentProviderRepository {
  callPaymentApi(orderId: string, totalAmount: number): Promise<any>;
}
export default PaymentProviderRepository;
