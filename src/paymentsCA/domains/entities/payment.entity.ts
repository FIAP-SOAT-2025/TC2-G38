import { v4 as uuidv4 } from 'uuid';
import { PaymentStatusEnum } from '../enums/payment-status.enum';
import { PaymentTypeEnum } from '../enums/payment-type.enum';

export class Payment {
  private _id: string;
  private _orderId: string;
  private _status: PaymentStatusEnum;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _type: PaymentTypeEnum;
  private _mercadoPagoPaymentId?: string;
  private _qrCode?: string;

  constructor(orderId: string, type: PaymentTypeEnum) {
    this._id = uuidv4();
    this._orderId = orderId;
    this._type = type;
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  get id(): string {
    return this._id;
  }

  get orderId(): string {
    return this._orderId;
  }

  get status(): PaymentStatusEnum { 
    return this._status;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get type(): PaymentTypeEnum {
    return this._type;
  }

  get mercadoPagoPaymentId(): string | undefined {
    return this._mercadoPagoPaymentId;
  }

  get qrCode(): string | undefined {
    return this._qrCode;
  }
}
export { PaymentStatusEnum };

