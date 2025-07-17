
import { PaymentStatusEnum } from "../domains/enums/payment-status.enum";
import { PaymentRepositoryInterface } from "../interfaces/payment";
import { Payment } from "../domains/entities/payment.entity";
import PaymentGatewayInterface from "../interfaces/gateways";

export default class PaymentGateway implements PaymentGatewayInterface {
  private dbRepository: PaymentRepositoryInterface;
  constructor(connection: PaymentRepositoryInterface) {
    this.dbRepository = connection;
  }

 async updateStatus( paymentId: string, status: PaymentStatusEnum): Promise<Payment> {
    const updatedPayment = await this.dbRepository.updateStatus(paymentId, status);

    return updatedPayment;
  }
 
  async find(id: string): Promise<Payment> {
    const payment = await this.dbRepository.find(id);
    if (!payment) {
      throw new Error(`Payment with ID ${id} not found`);
    }
    return payment;
  }
}
