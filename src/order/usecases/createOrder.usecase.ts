import ItemGatewayInterface from 'src/item/interfaces/itemGatewayInterface';
import OrderGatewayInterface from '../interfaces/gateways';
import { OrderDto } from '../infraestructure/api/dto/order.dto';
import { Customer } from 'src/customer/entities/customer.entity';
import GetCustomerByCpf from 'src/customer/usecases/getCustomerByCpf.usecase';
import CustomerGatewayInterface from 'src/customer/interfaces/gateways';
import ProccessOrderItemUseCase from './processOrderItem.usecase';
import Order from '../entities/order.entity';
import HasRepeatedOrderItemIdsUseCase from './item/existingItem.usecase copy';
import { BaseException } from 'src/shared/exceptions/exceptions.base';
import { OrderResponse } from '../infraestructure/api/dto/orderResponse.dto';
import { CreatePaymentUseCase } from 'src/payments/usecases/createPayment.usecase';
import { Payment } from 'src/payments/domains/entities/payment.entity';
import { OrderMapper } from '../presenters/orderMap';
import { CallPaymentProviderGatewayInterface } from 'src/payments/interfaces/call-payment-provider-gateway.interface';
import { PaymentGatewayInterface } from 'src/payments/interfaces/payment-gateway.interface';

export default class ProcessOrderUseCase {
  constructor() {}
  static async processOrder(
    orderData: OrderDto,
    orderGateway: OrderGatewayInterface,
    itemGateway: ItemGatewayInterface,
    customerGateway: CustomerGatewayInterface,
    paymentGateway: PaymentGatewayInterface,
    paymentProvider: CallPaymentProviderGatewayInterface,
  ): Promise<{ order: OrderResponse; payment: Payment }> {
    let customer: Customer | undefined;

    if (
      HasRepeatedOrderItemIdsUseCase.hasRepeatedOrderItemIds(
        orderData.orderItems,
      )
    ) {
      throw new BaseException(
        'Failed to create order: Order items must be unique. Found duplicate item IDs in order Items.',
        400,
        'HAD_ITEM_REPEATED',
      );
    }

    if (orderData.customerCpf) {
      customer = await GetCustomerByCpf.getCustomerByCpf(
        orderData.customerCpf,
        customerGateway,
      );
    }

    const processedOrderItems =
      await ProccessOrderItemUseCase.proccessOrderItem(orderData, itemGateway);

    const current_order = new Order({
      customerId: customer?.id,
      orderItems: processedOrderItems,
    });

    const createdOrder = await orderGateway.create(current_order);
    console.log(`----------------------------Created order:`, createdOrder);

    const payment = await CreatePaymentUseCase.createPayment(
      paymentGateway,
      paymentProvider,
      customer?.email || this.generateEmailForPaymentClient(createdOrder.id),
      createdOrder.id,
      createdOrder.price,
    );

    return {
      order: OrderMapper.mapOrderEntityToOrderProcessResponse(createdOrder),
      payment,
    };
  }

  private static generateEmailForPaymentClient(orderId: string): string {
    return `payment.order.id+${orderId}@gmail.com`;
  }
}
