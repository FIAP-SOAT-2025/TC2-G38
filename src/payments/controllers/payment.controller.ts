import { PaymentResponseAdapter } from "../infrastructure/adapters/payment-response.adapter";
import { PaymentGatewayInterface } from "../interfaces/payment-gateway.interface";
import OrderGatewayInterface from "src/order/interfaces/gateways";
import ItemGatewayInterface from "src/item/interfaces/itemGatewayInterface";
import WebhookUpdatePaymentStatusUseCase from "../usecases/webhookUpdatePaymentStatus.usecase";
import { PaymentGateway } from "../gateways/payment.gateway";
import { OrderGateway } from "src/order/infraestructure/gateways/order.gateway";
import { ItemGateway } from "src/item/gateways/item.gateway";
import { PaymentMapper } from "../presenter/mapEntityToResponse.dto";
import { PaymentStatusEnum } from "../domain/enums/payment-status.enum";
export class PaymentController {
  constructor() { }

  private static createPaymentGateway(paymentRepository: PaymentGatewayInterface) {
    return new PaymentGateway(paymentRepository);
  }

 

  static async updatePaymentStatus(
    paymentRepository: PaymentGatewayInterface,
    orderRepository: OrderGatewayInterface,
    itemRepository: ItemGatewayInterface,
    id: string,
    newStatus: PaymentStatusEnum
  ) {
    const paymentGateway = this.createPaymentGateway(paymentRepository);
    const orderGateway = new OrderGateway(orderRepository);
    const itemGateway = new ItemGateway(itemRepository);
    const useCase = new WebhookUpdatePaymentStatusUseCase();
    const updatedPayment = await useCase.updateStatus(
      paymentGateway,
      orderGateway,
      itemGateway,
      id,
      newStatus
    );
    return  PaymentMapper.mapPaymentToPaymentResponse(updatedPayment);
  }



  /*static async getPaymentStatus(
    paymentRepository: PaymentGatewayInterface,
    id: string
  ) {
    const paymentGateway = this.createPaymentGateway(paymentRepository);
    //const payment = await FindPaymentUseCase.getPaymentStatus(id, paymentGateway);
    return PaymentResponseAdapter.adaptJsonToMessage(payment);
  }*/

}