import Order from 'src/order-clean/entities/order.entity';
import {
  CompleteOrderResponse,
  OrderResponse,
} from 'src/order-clean/infraestructure/api/dto/orderResponse.dto';
import { PaymentMapper } from 'src/payments/presenter/mapEntityToResponse.dto';

export class OrderMapper {
  static mapOrderEntityToOrderProcessResponse(order: Order): OrderResponse {
    const response = new OrderResponse();
    response.id = order.id;
    response.status = order.status;
    response.totalAmount = order.price;
    response.customerId = order.customerId ?? null;
    return response;
  }

  // static mapOrderEntityToFindOrderResponse(
  //   order: Order,
  // ): CompleteOrderResponse {
  //   const complete_order_response = new CompleteOrderResponse();
  //   complete_order_response.id = order.id;
  //   complete_order_response.status = order.status;
  //   complete_order_response.totalAmount = order.price;
  //   complete_order_response.customerId = order.customerId;

  //   complete_order_response.orderItems = order.orderItems.map((item) => ({
  //     itemId: item._itemId,
  //     quantity: item._quantity,
  //     price: item._price,
  //   }));

  //   complete_order_response.createdAt = order.createdAt;
  //   complete_order_response.updatedAt = order.updatedAt;

  //   // if (order.payment) {
  //   //   complete_order_response.payment =
  //   //     PaymentMapper.mapPaymentToPaymentResponseDTO(order.payment);
  //   // }

  //   return complete_order_response;
  // }
}
