import { Payment, PaymentStatusEnum } from "../domain/entities/payment.entity";
import { PaymentTypeEnum } from "../domain/enums/payment-type.enum";
import { PaymentGatewayInterface } from "../interfaces/payment-gateway.interface";

export class PaymentGateway implements PaymentGatewayInterface {
  constructor(
    private readonly paymentRepository: PaymentGatewayInterface
  ) {}
 
  async create(
    orderId: string,
    type: PaymentTypeEnum,
    status: PaymentStatusEnum,
    paymentId: string,
    qrCode: string,
  ): Promise<Payment> {
    try {
      return await this.paymentRepository.create(
        orderId,
        type,
        status as PaymentStatusEnum,
        paymentId,
        qrCode,
      );
    } catch (error) {
      console.error('Error creating payment payment gateway:', error);
      throw error;
    }
  }

  async updatePaymentStatus( paymentId: string, status: PaymentStatusEnum): Promise<Payment> {
    return await this.paymentRepository.updatePaymentStatus(paymentId, status);
  }
 
  async find(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.find(id);
    if (!payment) {
      throw new Error(`Payment with ID ${id} not found`);
    }
    return payment;
  }
}