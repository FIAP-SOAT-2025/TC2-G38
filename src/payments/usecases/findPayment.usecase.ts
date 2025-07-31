import { BaseException } from "src/shared/exceptions/exceptions.base";
import { PaymentGatewayInterface } from "../interfaces/payment-gateway.interface";
import { Payment } from "../domain/entities/payment.entity";

export default class FindPaymentUseCase {
  constructor() {}

  static async getPaymentStatus(id: string, paymentGateway: PaymentGatewayInterface): Promise<Payment> {
    const payment = await paymentGateway.find(id);
    if (!payment) {
      throw new BaseException(`Payment with ID ${id} not found`, 404, 'PAYMENT_NOT_FOUND');
    }
    return payment;
  }
}