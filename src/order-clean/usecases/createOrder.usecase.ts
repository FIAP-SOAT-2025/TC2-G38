import ItemGatewayInterface from 'src/arch_item/interfaces/itemGatewayInterface';
import OrderGatewayInterface from '../interfaces/gateways';
import { OrderDto } from '../infraestructure/api/dto/order.dto';
import { Customer } from 'src/customer/entities/customer.entity';
import GetCustomerByCpf from 'src/customer/usecases/getCustomerByCpf.usecase';
import CustomerGatewayInterface from 'src/customer/interfaces/gateways';

export default class ProcessOrderUseCase {
  constructor() {}
  static async processOrder(
    orderData: OrderDto,
    orderGateway: OrderGatewayInterface,
    itemGateway: ItemGatewayInterface,
    customerGateway: CustomerGatewayInterface,
  ) {
    let customer: Customer | undefined;

    //  if (this._hasRepeatedOrderItemIds(orderData.orderItems)) {
    //       throw new BadRequestException(
    //         'Failed to create order: Order items must be unique. Found duplicate item IDs in order Items.',
    //       );
    //     }

    if (orderData.customerCpf) {
      customer = await GetCustomerByCpf.getCustomerByCpf(
        orderData.customerCpf,
        customerGateway,
      );
    }

    const processedOrderItems = await this._processOrderItems(orderData);
  }
}
