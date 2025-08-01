
import { PaymentGatewayInterface } from "../interfaces/payment-gateway.interface";
import OrderGatewayInterface from 'src/order/interfaces/gateways';
import ItemGatewayInterface from 'src/item/interfaces/itemGatewayInterface';
import UpdateStatusOrderUseCase from 'src/order/usecases/updateStatusOrder.usecase';
import { OrderStatusEnum } from 'src/order/enums/orderStatus.enum';
import { Payment, PaymentStatusEnum } from '../domain/entities/payment.entity';
import ValidateStatusUseCase from "./validateStatus.usecase";


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
    ValidateStatusUseCase.validate(payment, newStatus, id);

    if (newStatus === PaymentStatusEnum.APPROVED) {
      updatedPayment = await paymentGatewayI.updatePaymentStatus(payment.id, newStatus);
      await UpdateStatusOrderUseCase.updateStatusOrder(payment.orderId, OrderStatusEnum.RECEIVED, orderGatewayI, itemGatewayI);
    } else if (newStatus !== PaymentStatusEnum.PENDING) {
      updatedPayment = await paymentGatewayI.updatePaymentStatus(payment.id, newStatus);
      await UpdateStatusOrderUseCase.updateStatusOrder(payment.orderId, OrderStatusEnum.CANCELLED, orderGatewayI, itemGatewayI);
    } 

    return updatedPayment!;
  }



}