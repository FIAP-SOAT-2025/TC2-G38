/* eslint-disable prettier/prettier */
import ItemGatewayInterface from 'src/item/interfaces/itemGatewayInterface';
import { OrderGateway } from '../gateways/order.gateway';
import OrderGatewayInterface from '../interfaces/gateways';
import FindAllOrderUseCase from '../usecases/findAllOrder.usecase';
import FindOrderByIdUseCase from '../usecases/findOrder.usecase';
import UpdateStatusOrderUseCase from '../usecases/updateStatusOrder.usecase';
import { ItemGateway } from 'src/item/gateways/item.gateway';
import CustomerGatewayInterface from 'src/customer/interfaces/gateways';
import ProcessOrderUseCase from '../usecases/createOrder.usecase';
import { OrderDto } from '../infraestructure/api/dto/order.dto';
import { CustomerGateway } from 'src/customer/gateways/customer.gateway';
import Order from '../entities/order.entity';
import { OrderStatusEnum } from '../enums/orderStatus.enum';
import { OrderResponse } from '../infraestructure/api/dto/orderResponse.dto';
import { PaymentRepositoryInterface } from 'src/payments/interfaces/payment-repository.interface';
import { Payment } from 'src/payments/domain/entities/payment.entity';
import { PaymentProviderGateway } from 'src/payments/gateways/payment-provider.gateway';
import { PaymentGateway } from 'src/payments/gateways/payment.gateway';
import { CallPaymentProviderGatewayInterface } from 'src/payments/interfaces/call-payment-provider-gateway.interface';

export class OrderController {
  constructor() { }

  static async createOrder(
    createOrderDto: OrderDto,
    orderRepository: OrderGatewayInterface,
    itemRepository: ItemGatewayInterface,
    customerRepository: CustomerGatewayInterface,
    paymentRepository: PaymentRepositoryInterface,
    paymentProvider: CallPaymentProviderGatewayInterface,
  ): Promise<{ order: OrderResponse; payment: Payment }> {
    const orderGateway = new OrderGateway(orderRepository);
    const itemGateway = new ItemGateway(itemRepository);
    const customerGateway = new CustomerGateway(customerRepository);
    const paymentGateway = new PaymentGateway(paymentRepository);
    const paymentProviderGateway = new PaymentProviderGateway(paymentProvider);

    try {
      return ProcessOrderUseCase.processOrder(
        createOrderDto,
        orderGateway,
        itemGateway,
        customerGateway,
        paymentGateway,
        paymentProviderGateway,
      );
    } catch (error) {
      throw new Error(`Failed to create order  - ${JSON.stringify(error)}`);
    }
  }

  static async find(
    id: string,
    orderRepository: OrderGatewayInterface,
  ): Promise<Order> {
    const orderGateway = new OrderGateway(orderRepository);
    return FindOrderByIdUseCase.findOrder(id, orderGateway);
  }

  static async findAll(
    orderRepository: OrderGatewayInterface,
  ): Promise<Order[]> {
    const orderGateway = new OrderGateway(orderRepository);
    return FindAllOrderUseCase.findAll(orderGateway);
  }

  static async updateStatus(
    id: string,
    statusDto: OrderStatusEnum,
    orderRepository: OrderGatewayInterface,
    itemRepository: ItemGatewayInterface,
  ): Promise<{ message: string }> {
      const orderGateway = new OrderGateway(orderRepository);
      return UpdateStatusOrderUseCase.updateStatusOrder(id, statusDto, orderGateway, itemRepository);
  }
}
