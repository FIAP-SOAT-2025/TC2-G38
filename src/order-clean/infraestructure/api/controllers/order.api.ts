import { Body, Controller, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import OrderGatewayInterface from 'src/order-clean/interfaces/gateways';
import { OrderController } from 'src/order-clean/controllers/order.controller';
import { OrderDto } from '../dto/order.dto';
import { CompleteOrderResponse, OrderResponse } from '../dto/orderResponse.dto';
import ItemGatewayInterface from 'src/arch_item/interfaces/itemGatewayInterface';
import { OrderStatusEnum } from 'src/order-clean/enums/orderStatus.enum';
import CustomerGatewayInterface from 'src/customer/interfaces/gateways';
import Order from 'src/order-clean/entities/order.entity';
import { PaymentRepositoryInterface } from 'src/payments/interfaces/payment-repository.interface';

@ApiTags('Order')
@Controller('/order')
export class OrderApi {
  constructor(
    @Inject('OrderGatewayInterface') private readonly orderRepository: OrderGatewayInterface,
    @Inject('ItemGatewayInterface') private readonly itemRepository: ItemGatewayInterface,
    @Inject('CustomerGatewayInterface') private readonly customerRepsitory: CustomerGatewayInterface,
    @Inject('PaymentRepositoryInterface') private readonly paymentRepository: PaymentRepositoryInterface,
  ) {}

  @Post()
  createOrder(@Body() createOrderDto: OrderDto): Promise<OrderResponse> {
    return OrderController.createOrder(
      createOrderDto,
      this.orderRepository,
      this.itemRepository,
      this.customerRepsitory,
      this.paymentRepository,
    );
  }

  @Get('/:id')
  find(@Param('id') id: string): Promise<Order> {
    return OrderController.find(id, this.orderRepository);
  }

  @Get()
  findAll(): Promise<Order[]> {
    return OrderController.findAll(this.orderRepository);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() statusDto: OrderStatusEnum) {
    return OrderController.updateStatus(id, statusDto, this.orderRepository);
  }
}
