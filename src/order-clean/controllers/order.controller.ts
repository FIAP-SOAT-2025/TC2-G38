import { OrderGateway } from '../gateways/order.gateway';
import { UpdateOrderStatusDto } from '../infraestructure/api/dto/update-status.dto';
import OrderGatewayInterface from '../interfaces/gateways';
import FindAllOrderUseCase from '../usecases/findAllOrder.usecase';
import FindOrderByIdUseCase from '../usecases/findOrder.usecase';
import UpdateStatusOrderUseCase from '../usecases/updateStatusOrder.usecase';

export class OrderController {
  constructor() {}

  // static async createOrder(
  //   createOrderDto: OrderDto,
  //   orderRepository: OrderGatewayInterface,
  // ) {
  //   const orderGateway = new OrderGateway(orderRepository);
  //   try {
  //   } catch (error) {
  //     throw new Error('Failed to fetch customer by CPF');
  //   }
  // }

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
    statusDto: UpdateOrderStatusDto,
    orderRepository: OrderGatewayInterface,
  ) {
    const orderGateway = new OrderGateway(orderRepository);
    return UpdateStatusOrderUseCase.updateStatus(id, statusDto, orderGateway);
  }
}
