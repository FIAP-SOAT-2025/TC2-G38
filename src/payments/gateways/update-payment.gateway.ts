
import { PaymentStatusEnum } from "../domains/enums/payment-status.enum";
import { PaymentRepositoryInterface } from "../interfaces/payment-repository.interface";
import { Payment } from "../domains/entities/payment.entity";
import { UpdatePaymentGatewayInterface } from "src/payments/interfaces/update-payment-gateways.interface";

export default class UpdatePaymentGateway implements UpdatePaymentGatewayInterface {
 constructor(
    private readonly paymentRepository: PaymentRepositoryInterface
  ) {}
 
 async updateStatus( paymentId: string, status: PaymentStatusEnum): Promise<Payment> {
    return await this.paymentRepository.updateStatus(paymentId, status);
  }
 
  async find(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.find(id);
    if (!payment) {
      throw new Error(`Payment with ID ${id} not found`);
    }
    return payment;
  }
}
