import { GenerateEmailGatewayInterface } from "../interfaces/generate-email-gateway.interface";
import { PaymentRepositoryInterface } from "../interfaces/payment-repository.interface";

export default class GenerateEmailGateway  implements GenerateEmailGatewayInterface {
 constructor(
    private readonly paymentRepository: PaymentRepositoryInterface
  ) {}
 
 async generateEmail(orderId: string) {
    return await this.paymentRepository.getOrGenerateCustomerEmail(orderId);
  }
}
