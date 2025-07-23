export interface GenerateEmailGatewayInterface {
  generateEmail(orderId: string): Promise<any>;
}
