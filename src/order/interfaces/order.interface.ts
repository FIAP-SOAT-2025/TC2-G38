import OrderItemInterface from './order-item.interface';

export default interface OrderInterface {
  customerCpf?: string;
  orderItems: OrderItemInterface[];
}
