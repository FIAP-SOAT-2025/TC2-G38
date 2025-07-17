import { OrderDto } from '../infraestructure/api/dto/order.dto';
import { UpdateOrderStatusDto } from '../infraestructure/api/dto/update-status.dto';
import OrderGatewayInterface from '../interfaces/gateways';

export class OrderController {
  constructor() {}

  static async createOrder(
    createOrderDto: OrderDto,
    orderRepository: OrderGatewayInterface,
  ) {
    // return await this.orderService.process(createOrderDto);
  }

  static async find(id: string, orderRepository: OrderGatewayInterface) {
    // return await this.listOrderService.find(id);
  }

  static async findAll(orderRepository: OrderGatewayInterface) {
    // return await this.listOrderService.findAll();
  }

  async updateStatus(id: string, statusDto: UpdateOrderStatusDto) {
    // return await this.updateOrderService.updateStatus(id, statusDto.status);
  }
}
