import OrderItemInterface from './order-item.interface';

export default interface OrderInterface {
  id?: string;
  status?: string;
  totalAmount?: number;
  createdAt?: Date;
  updatedAt?: Date;
  customerId?: string;
  customerCpf?: string;
  orderItems?: OrderItemInterface[];
}
