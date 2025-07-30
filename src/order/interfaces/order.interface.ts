import { OrderItemDto } from '../infraestructure/api/dto/order.dto';

export default interface OrderInterface {
  customerCpf?: string;
  orderItems: OrderItemDto[];
}
