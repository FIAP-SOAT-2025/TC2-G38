import { v4 as uuidv4 } from 'uuid';

export enum PaymentStatusEnum {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REFUSED = 'REFUSED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentTypeEnum {
  PIX = 'PIX',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
}

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
