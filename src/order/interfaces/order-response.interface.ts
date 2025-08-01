import OrderItemInterface from './order-item.interface';

export default interface OrderResponseInterface {
  id: string;
  status: string;
  totalAmount: number;
  customerId?: string | null;
  orderItems?: OrderItemInterface[];
  createdAt?: Date;
  updatedAt?: Date;
}
