import { PaymentStatusEnum } from "../domains/enums/payment-status.enum";

export interface CreatePaymentGatewayInterface {
  createPayment( paymentId: string,
      qrCode: string,
      status: PaymentStatusEnum,
      orderId: string
  ): Promise<any>;
}
