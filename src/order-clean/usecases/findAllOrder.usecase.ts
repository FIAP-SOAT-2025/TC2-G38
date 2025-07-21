import { OrderMapper } from 'src/order/domain/mappings/mapEntityToResponseDto';
import { CompleteOrderResponse } from '../infraestructure/api/dto/orderResponse.dto';
import OrderGatewayInterface from '../interfaces/gateways';
import Order from '../entities/order.entity';

export default class FindAllOrderUseCase {
  constructor() {}
  static async findAll(orderGateway: OrderGatewayInterface): Promise<Order[]> {
    const order = await orderGateway.findAll();

    return order.map((order) =>
      OrderMapper.mapOrderEntityToFindOrderResponse(order),
    );
  }
}
