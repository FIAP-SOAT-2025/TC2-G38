export interface CallPaymentProviderGatewayInterface {
  callPaymentApi(totalAmount: number, email: string): Promise<any>;
}
