import { Payment } from "../domains/entities/payment.entity";
import { PaymentRepositoryInterface } from "../interfaces/payment";
import { PaymentProviderInterface } from "../interfaces/payment-provider";
import { PaymentTypeEnum } from "src/paymentsCA/domains/enums/payment-type.enum";
import { PaymentStatusEnum } from "src/paymentsCA/domains/enums/payment-status.enum";

export class CreatePaymentUseCase  {
  constructor(
    private readonly payment: PaymentRepositoryInterface,
    private readonly paymentProvider: PaymentProviderInterface,
  ) {}

  async createPayment(orderId: string, totalAmount: number): Promise<Payment> {
    try {
      const response = await this.paymentProvider.callPaymentApi(
        orderId,
        totalAmount,
      );
      const paymentId = String(response.id);
      const qrCode = response.point_of_interaction?.transaction_data?.qr_code;
      const status = (response.status as string).toUpperCase();

      return await this.payment.create(
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
