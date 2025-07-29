import { v4 as uuidv4 } from 'uuid';
import { Payment } from 'src/payments/domain/entities/payment.entity';
import { OrderStatusEnum } from '../enums/orderStatus.enum';
import { OrderItem, OrderItemProps } from './orderItem.entity';
import { BaseException } from 'src/shared/exceptions/exceptions.base';

export interface OrderProps {
  id?: string;
  status?: OrderStatusEnum;
  customerId?: string;
  orderItems: OrderItemProps[];
  payment?: Payment;
  price?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class Order {
  id: string;
  status: OrderStatusEnum;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  customerId?: string;
  orderItems: OrderItem[];
  payment?: Payment;

  constructor(props: OrderProps) {
    this.id = props.id ?? uuidv4();
    this.status = (props.status as OrderStatusEnum) ?? OrderStatusEnum.PENDING;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.customerId = props.customerId;
    this.orderItems = props.orderItems.map(
      (item) =>
        new OrderItem({
          ...item,
          orderId: this.id,
        }),
    );
    this.price = this._calculatePrice(props.orderItems);
  }

  addPayment(payment: Payment) {
    this.payment = payment;
  }

  updateOrderStatus(newStatus: OrderStatusEnum): void {
    const statusOrder = [
      OrderStatusEnum.PENDING,
      OrderStatusEnum.RECEIVED,
      OrderStatusEnum.PREPARING,
      OrderStatusEnum.READY,
      OrderStatusEnum.COMPLETED,
    ] as OrderStatusEnum[];

    const currentIndex = statusOrder.indexOf(this.status);
    const newIndex = statusOrder.indexOf(newStatus);

    if (this.status === OrderStatusEnum.COMPLETED || this.status === OrderStatusEnum.CANCELLED) {
      throw new BaseException('Cannot change status of a completed or cancelled order', 400, 'ORDER_STATUS_FINALIZED');
    }
    
    

    if (this.status === newStatus) {
      throw new BaseException('Order status is already set to this value', 400, 'ORDER_STATUS_ALREADY_SET');
    }

    if (newIndex !== currentIndex + 1 && newStatus !== OrderStatusEnum.CANCELLED) {
      console.log("Order status must follow the defined sequence.", this.status, newStatus);
      throw new BaseException(
        `Order status must follow the defined sequence. Next status must be ${statusOrder[currentIndex + 1]}`,
        400,
        'ORDER_STATUS_SEQUENCE'
      );
    }

    this.status = newStatus;
    this.updatedAt = new Date();
  }

  private _calculatePrice(orderItems: OrderItemProps[]): number {
    if (!orderItems || orderItems.length === 0) {
      throw new Error('No order items provided');
    }

    const totalCents = orderItems.reduce((total, item) => {
      if (!item.price || !item.quantity) {
        throw new Error(
          `Invalid item price or quantity. Price: ${item.price}, Quantity: ${item.quantity}`,
        );
      }
      return total + item.price * item.quantity * 100;
    }, 0);

    return Math.round(totalCents) / 100;
  }
}
