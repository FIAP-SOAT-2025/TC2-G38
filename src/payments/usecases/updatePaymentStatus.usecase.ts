import { PaymentStatusEnum } from '../domains/enums/payment-status.enum';
import { IEventEmitter } from "src/shared/event/domain/eventEmitterInterface";
import { PaymentGatewayInterface } from "../interfaces/payment-gateway.interface";
import { Payment } from '../domains/entities/payment.entity';
import { BaseException } from 'src/shared/exceptions/exceptions.base';
export default class UpdatePaymentStatusUseCase {
  constructor(private readonly eventEmitter: IEventEmitter) {}

  async updateStatus(
    paymentGatewayI: PaymentGatewayInterface,
    id: string,
    newStatus: PaymentStatusEnum
  ): Promise<Payment> {
    const payment = await paymentGatewayI.find(id);

    this.validateStatus(payment, newStatus, id);

    const updatedPayment = await paymentGatewayI.updateStatus(id, newStatus);

    if (newStatus === PaymentStatusEnum.APPROVED) {
      this.eventEmitter.emit('payment.approved', { orderId: updatedPayment.orderId });
    }

    return updatedPayment;
  }

  private validateStatus(payment: Payment, newStatus: PaymentStatusEnum, id: string): void {
    if (payment.status === newStatus) {
      throw new BaseException(
        `Payment with ID ${id} is already in ${payment.status} status`,
        409,
        'PAYMENT_ALREADY_IN_STATUS'
      );
    }

    if (payment.status === PaymentStatusEnum.APPROVED) {
      throw new BaseException(
        `Payment with ID ${id} is approved and cannot be updated.`,
        409,
        'PAYMENT_ALREADY_APPROVED'
      );
    }
  }
}