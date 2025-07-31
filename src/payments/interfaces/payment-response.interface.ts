import { PaymentStatusEnum } from "../domain/enums/payment-status.enum";
import { PaymentTypeEnum } from "../domain/enums/payment-type.enum";

export interface PaymentResponse  {
  id: string;
  orderId: string;
  status: PaymentStatusEnum;
  type:  PaymentTypeEnum;
  mercadoPagoPaymentId?: string;
  qrCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}