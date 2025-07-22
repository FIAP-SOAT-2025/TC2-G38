import { Body, Controller, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import OrderGatewayInterface from 'src/order-clean/interfaces/gateways';
import { OrderController } from 'src/order-clean/controllers/order.controller';
import { OrderDto } from '../dto/order.dto';
import { OrderResponse } from '../dto/orderResponse.dto';
import ItemGatewayInterface from 'src/arch_item/interfaces/itemGatewayInterface';
import { OrderStatusEnum } from 'src/order-clean/enums/orderStatus.enum';
import CustomerGatewayInterface from 'src/customer/interfaces/gateways';
import Order from 'src/order-clean/entities/order.entity';
import { PrismaItemRepository } from 'src/arch_item/infraestructure/persistence/prismaItem.repository';
import { PrismaOrderRepository } from '../../persistence/order.repository';
import { PrismaCustomerRepository } from 'src/customer/infraestructure/persistence/prismaCustomer.repository';
import { PrismaPaymentRepository } from 'src/payments/infrastructure/persistence/prismaPayment.repository';

@ApiTags('Order')
@Controller('/order')
export class OrderApi {
  constructor(
    private readonly orderRepository: PrismaOrderRepository,
    private readonly itemRepository: PrismaItemRepository,
    private readonly customerRepsitory: PrismaCustomerRepository,
    private readonly paymentRepository: PrismaPaymentRepository,
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
