import { OrderMapper } from 'src/order/domain/mappings/mapEntityToResponseDto';
import { CompleteOrderResponse } from '../infraestructure/api/dto/orderResponse.dto';
import OrderGatewayInterface from '../interfaces/gateways';

export default class FindAllOrderUseCase {
  constructor() {}
  static async findAll(
    orderGateway: OrderGatewayInterface,
  ): Promise<CompleteOrderResponse[]> {
    const order = await orderGateway.findAll();

    return order.map((order) =>
      OrderMapper.mapOrderEntityToFindOrderResponse(order),
    );
  }
}
