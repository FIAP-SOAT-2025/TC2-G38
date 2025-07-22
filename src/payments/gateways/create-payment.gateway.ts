import { Payment, PaymentStatusEnum } from "../domains/entities/payment.entity";
import { PaymentTypeEnum } from "../domains/enums/payment-type.enum";
import { CreatePaymentGatewayInterface } from "../interfaces/create-payment-gateway.interface";
import { PaymentProviderInterface } from "../interfaces/payment-provider.interface";
import { PaymentRepositoryInterface } from "../interfaces/payment-repository.interface";

export class CreatePaymentServiceGateway implements CreatePaymentGatewayInterface {
  constructor(
    private readonly paymentRepository: PaymentRepositoryInterface
  ) {}
 
  async createPayment(
    paymentProvider: PaymentProviderInterface,
    orderId: string,
    totalAmount: number
  ): Promise<Payment> {
    try {
      const response = await paymentProvider.callPaymentApi(
        orderId,
        totalAmount,
      );
      const paymentId = String(response.id);
      const qrCode = response.point_of_interaction?.transaction_data?.qr_code;
      const status = (response.status as string).toUpperCase();

      return  await this.paymentRepository.create(
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