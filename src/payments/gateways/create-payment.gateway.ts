import { Payment, PaymentStatusEnum } from "../domains/entities/payment.entity";
import { PaymentTypeEnum } from "../domains/enums/payment-type.enum";
import { CreatePaymentGatewayInterface } from "../interfaces/create-payment-gateway.interface";
import { PaymentRepositoryInterface } from "../interfaces/payment-repository.interface";

export class CreatePaymentServiceGateway implements CreatePaymentGatewayInterface {
  constructor(
    private readonly paymentRepository: PaymentRepositoryInterface
  ) {}
 
  async createPayment(
    paymentId: string,
    qrCode: string,
    status: PaymentStatusEnum,
    orderId: string
  ): Promise<Payment> {
    try {
      return await this.paymentRepository.create(
        orderId,
        PaymentTypeEnum.PIX,
        status as PaymentStatusEnum,
        paymentId,
        qrCode,
      );
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  }
}