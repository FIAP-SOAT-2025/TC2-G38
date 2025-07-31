
import { PaymentGatewayInterface } from "../interfaces/payment-gateway.interface";
import OrderGatewayInterface from 'src/order/interfaces/gateways';
import ItemGatewayInterface from 'src/item/interfaces/itemGatewayInterface';
import UpdateStatusOrderUseCase from 'src/order/usecases/updateStatusOrder.usecase';
import { OrderStatusEnum } from 'src/order/enums/orderStatus.enum';
import { Payment, PaymentStatusEnum } from '../domain/entities/payment.entity';
import { BaseException } from "src/shared/exceptions/exceptions.base";

export default class WebhookUpdatePaymentStatusUseCase {
  constructor() {}
async updateStatus(
    paymentGatewayI: PaymentGatewayInterface,
     orderGatewayI: OrderGatewayInterface,
    itemGatewayI: ItemGatewayInterface,
    id: string,
    newStatus: PaymentStatusEnum
  ): Promise<Payment> {
    let updatedPayment: Payment;
    const payment = await paymentGatewayI.find(id);
    if (!payment) {
      throw new Error(`Payment with ID ${id} not found`);
    }
    this.validateStatus(payment, newStatus, id);

    if (newStatus === PaymentStatusEnum.APPROVED) {
      updatedPayment = await paymentGatewayI.updatePaymentStatus(payment.id, newStatus);
      await UpdateStatusOrderUseCase.updateStatusOrder(payment.orderId, OrderStatusEnum.RECEIVED, orderGatewayI, itemGatewayI);
    } else if (newStatus !== PaymentStatusEnum.PENDING) {
      updatedPayment = await paymentGatewayI.updatePaymentStatus(payment.id, newStatus);
      await UpdateStatusOrderUseCase.updateStatusOrder(payment.orderId, OrderStatusEnum.CANCELLED, orderGatewayI, itemGatewayI);
    } 

    return updatedPayment!;
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