import PaymentGatewayInterface from '../interfaces/gateways';
import { PaymentStatusEnum } from '../domains/enums/payment-status.enum';
import { IEventEmitter } from "src/shared/event/domain/eventEmitterInterface";
export default class UpdatePaymentStatusUseCase {
  constructor(private readonly eventEmitter: IEventEmitter) {}

  async updateStatus(
    paymentGatewayI: PaymentGatewayInterface,
    id: string,
    newStatus: PaymentStatusEnum
  ): Promise<{ message: string }> {
    const payment = await paymentGatewayI.find(id);

    if (payment.status === newStatus) {
      throw new Error(`Payment with ID ${id} is already in ${payment.status} status`);
    }

    if (payment.status === PaymentStatusEnum.APPROVED) {
      throw new Error(`Payment with ID ${id} is approved and cannot be updated.`);
    }

    const updatedPayment = await paymentGatewayI.updateStatus(id, newStatus);

    if (newStatus === PaymentStatusEnum.APPROVED) {
      this.eventEmitter.emit('payment.approved', { orderId: updatedPayment.orderId });
    }

    return { message: `Payment with ID ${id} updated successfully` };
  }
}