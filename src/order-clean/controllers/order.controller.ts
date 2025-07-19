import { OrderGateway } from '../gateways/order.gateway';
import { OrderDto } from '../infraestructure/api/dto/order.dto';
import { UpdateOrderStatusDto } from '../infraestructure/api/dto/update-status.dto';
import OrderGatewayInterface from '../interfaces/gateways';

export class OrderController {
  constructor() { }

  static async createOrder(
    createOrderDto: OrderDto,
    orderRepository: OrderGatewayInterface,
  ) {
    const orderGateway = new OrderGateway(orderRepository);
    try {

    } catch (error) {
      throw new Error('Failed to fetch customer by CPF');
    }
  }

  static async find(id: string, orderRepository: OrderGatewayInterface) {
    const orderGateway = new OrderGateway(orderRepository);
    // return await this.listOrderService.find(id);
  }

  static async findAll(orderRepository: OrderGatewayInterface) {
    const orderGateway = new OrderGateway(orderRepository);
    // return await this.listOrderService.findAll();
  }

  async updateStatus(
    id: string,
    statusDto: UpdateOrderStatusDto,
    orderRepository: OrderGatewayInterface,
  ) {
    const orderGateway = new OrderGateway(orderRepository);
    // return await this.updateOrderService.updateStatus(id, statusDto.status);
  }
}
