import ItemGatewayInterface from 'src/arch_item/interfaces/itemGatewayInterface';
import { OrderGateway } from '../gateways/order.gateway';
import OrderGatewayInterface from '../interfaces/gateways';
import FindAllOrderUseCase from '../usecases/findAllOrder.usecase';
import FindOrderByIdUseCase from '../usecases/findOrder.usecase';
import UpdateStatusOrderUseCase from '../usecases/updateStatusOrder.usecase';
import { ItemGatway } from 'src/arch_item/gateways/item.gateway';
import CustomerGatewayInterface from 'src/customer/interfaces/gateways';
import ProcessOrderUseCase from '../usecases/createOrder.usecase';
import { OrderDto } from '../infraestructure/api/dto/order.dto';
import { CustomerGateway } from 'src/customer/gateways/customer.gateway';
import Order from '../entities/order.entity';
import { OrderStatusEnum } from '../enums/orderStatus.enum';
import { OrderResponse } from '../infraestructure/api/dto/orderResponse.dto';
import { PaymentRepositoryInterface } from 'src/paymentsCA/interfaces/payment-repository.interface';
import { CreatePaymentServiceGateway } from 'src/paymentsCA/gateways/create-payment.gateway';

export class OrderController {
  constructor() {}

  static async createOrder(
    createOrderDto: OrderDto,
    orderRepository: OrderGatewayInterface,
    itemRepository: ItemGatewayInterface,
    customerRepository: CustomerGatewayInterface,
    paymentRepository: PaymentRepositoryInterface,
  ): Promise<OrderResponse> {
    const orderGateway = new OrderGateway(orderRepository);
    const itemGateway = new ItemGatway(itemRepository);
    const customerGateway = new CustomerGateway(customerRepository);
    const paymentGateway = new CreatePaymentServiceGateway(paymentRepository);

    try {
      return ProcessOrderUseCase.processOrder(
        createOrderDto,
        orderGateway,
        itemGateway,
        customerGateway,
        paymentGateway,
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
  ): Promise<{ message: string }> {
    const orderGateway = new OrderGateway(orderRepository);
    return UpdateStatusOrderUseCase.updateStatus(id, statusDto, orderGateway);
  }
}
