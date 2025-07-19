import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import OrderRepository from '../domain/repository/order.repository';
import { OrderDto, OrderItemDto } from '../domain/dto/order.dto';
import Order from '../domain/model/order.entity';
import { ProcessOrderServiceInterface } from '../domain/services/order.service.interface';
import { OrderResponse } from '../domain/dto/orderResponse.dto';

import ItemRepository from 'src/item/domain/repository/item.repository';
import { OrderDomainError } from '../domain/model/exceptions/order.exception';
import Item from 'src/item/domain/model/item.entity';
import { OrderItemProps } from '../domain/model/orderItem.entity';
//TODO REVER O IMPORT DO REPOSITORY
import { PrismaCustomerRepository } from 'src/customer/infraestructure/persistence/prismaCustomer.repository';
import { OrderMapper } from '../domain/mappings/mapEntityToResponseDto';
//TODO REVER O IMPORT DA ENTIDADE
import { Customer } from 'src/customer/entities/customer.entity';
import { Payment } from 'src/payments/domain/model/payment.entity';
import { CreatePaymentServiceInterface } from 'src/payments/domain/services/payment.service.interface';

export default class ProcessOrderService
  implements ProcessOrderServiceInterface
{
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
    @Inject('ItemRepository')
    private readonly itemRepository: ItemRepository,
    @Inject('CustomerRepository')
    private readonly customerRepository: PrismaCustomerRepository,
    @Inject('CreatePaymentServiceInterface')
    private readonly paymentService: CreatePaymentServiceInterface,
  ) {}
  async process(
    orderData: OrderDto,
  ): Promise<{ order: OrderResponse; payment: Payment }> {
    let customer: Customer | undefined;

    if (this._hasRepeatedOrderItemIds(orderData.orderItems)) {
      throw new BadRequestException(
        'Failed to create order: Order items must be unique. Found duplicate item IDs in order Items.',
      );
    }

    if (orderData.customerCpf)
      customer = await this._processCustomer(orderData.customerCpf);

    const processedOrderItems = await this._processOrderItems(orderData);

    const current_order = new Order({
      customerId: customer?.id,
      orderItems: processedOrderItems,
    });

    const createdOrder = await this.orderRepository.create(current_order);
    const payment = await this.paymentService.createPayment(
      createdOrder.id,
      createdOrder.price,
    );

    return {
      order: OrderMapper.mapOrderEntityToOrderProcessResponse(createdOrder),
      payment: payment,
    };
  }

  private _hasRepeatedOrderItemIds = (orderItems: OrderItemDto[]): boolean => {
    const seen = new Set<string>();
    for (const { itemId } of orderItems) {
      if (seen.has(itemId)) return true;
      seen.add(itemId);
    }
    return false;
  };

  private async _processCustomer(customerCpf: string): Promise<Customer> {
    try {
      return await this.customerRepository.findByCpf(customerCpf);
    } catch {
      throw new NotFoundException(
        `Failed to create order: Customer with cpf ${customerCpf} does not exist`,
      );
    }
  }

  private async _processOrderItems(
    orderDto: OrderDto,
  ): Promise<OrderItemProps[]> {
    const processedOrderItems: OrderItemProps[] = [];
    for (const orderItem of orderDto.orderItems) {
      const { id, price } = await this._validateOrderItem(orderItem);

      processedOrderItems.push({
        itemId: id as string,
        quantity: orderItem.itemQuantity,
        price,
      });
    }
    return processedOrderItems;
  }

  private async _validateOrderItem(orderItemDto: OrderItemDto): Promise<Item> {
    const item = await this._getExistingItem(orderItemDto.itemId);
    if (!item) {
      throw new NotFoundException(
        `Failed to create order: Item with ID ${orderItemDto.itemId} does not exist`,
      );
    }
    const isItemQuantityValid = this._isItemQuantityAvailable(
      item,
      orderItemDto.itemQuantity,
    );
    if (!isItemQuantityValid) {
      throw new OrderDomainError(
        `Failed to create order: Item with ID ${orderItemDto.itemId} does not have enough quantity. Quantity: ${item.quantity}`,
      );
    }
    return item;
  }

  private async _getExistingItem(itemId: string): Promise<Item | null> {
    const item = await this.itemRepository.findByIdIfNotDeleted(itemId, false);
    if (!item) return null;
    return item;
  }

  private _isItemQuantityAvailable(item: Item, dtoQuantity: number): boolean {
    if (item.quantity < dtoQuantity) return false;
    return true;
  }
}
