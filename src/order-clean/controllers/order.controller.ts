import ItemGatewayInterface from 'src/arch_item/interfaces/itemGatewayInterface';
import { OrderGateway } from '../gateways/order.gateway';
import { UpdateOrderStatusDto } from '../infraestructure/api/dto/update-status.dto';
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

export class OrderController {
  constructor() { }

  static async createOrder(
    createOrderDto: OrderDto,
    orderRepository: OrderGatewayInterface,
    itemRepository: ItemGatewayInterface,
    customerRepository: CustomerGatewayInterface
  ) {
    const orderGateway = new OrderGateway(orderRepository);
    const itemGateway = new ItemGatway(itemRepository);
    const customerGateway = new CustomerGateway(customerRepository);

    try {
      return ProcessOrderUseCase.processOrder(
        createOrderDto,
        orderGateway,
        itemGateway,
        customerGateway,
      );
    } catch (error) {
      throw new Error('Failed to fetch customer by CPF');
    }
  }

  static async find(id: string, orderRepository: OrderGatewayInterface) {
    const orderGateway = new OrderGateway(orderRepository);
    return FindOrderByIdUseCase.findOrder(id, orderGateway);
  }

  static async findAll(orderRepository: OrderGatewayInterface) {
    const orderGateway = new OrderGateway(orderRepository);
    return FindAllOrderUseCase.findAll(orderGateway);
  }

  async updateStatus(
    id: string,
    statusDto: OrderStatusEnum,
    orderRepository: OrderGatewayInterface,
  ) {
    const orderGateway = new OrderGateway(orderRepository);
    return UpdateStatusOrderUseCase.updateStatus(id, statusDto as OrderStatusEnum, orderGateway);
  }
}
