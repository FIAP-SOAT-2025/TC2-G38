import { v4 as uuidv4 } from 'uuid';
import { PaymentStatusEnum } from '../../shared/enums/payment-status.enum';
import { PaymentTypeEnum } from '../../shared/enums/payment-type.enum';

export class Payment {
  id: string;
  orderId: string;
  status: PaymentStatusEnum;
  createdAt: Date;
  updatedAt: Date;
  type: PaymentTypeEnum;
  mercadoPagoPaymentId?: string;
  qrCode?: string;

  constructor(orderId: string, type: PaymentTypeEnum) {
    this.id = uuidv4();
    this.orderId = orderId;
    this.type = type;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
export { PaymentStatusEnum };

