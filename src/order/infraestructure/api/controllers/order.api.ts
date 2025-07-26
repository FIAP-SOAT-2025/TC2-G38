import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderController } from 'src/order/controllers/order.controller';
import { OrderDto } from '../dto/order.dto';
import { OrderResponse } from '../dto/orderResponse.dto';
import { OrderStatusEnum } from 'src/order/enums/orderStatus.enum';
import Order from 'src/order/entities/order.entity';
import { PrismaItemRepository } from 'src/item/infraestructure/persistence/prismaItem.repository';
import { PrismaOrderRepository } from '../../persistence/order.repository';
import { PrismaCustomerRepository } from 'src/customer/infraestructure/persistence/prismaCustomer.repository';
import { PrismaPaymentRepository } from 'src/payments/infrastructure/persistence/prismaPayment.repository';
import { Payment } from 'src/payments/domain/entities/payment.entity';
import { MercadoPagoClient } from 'src/payments/infrastructure/external/mercado-pago/mercado-pago.client';

@ApiTags('Order')
@Controller('/order')
export class OrderApi {
  constructor(
    private readonly orderRepository: PrismaOrderRepository,
    private readonly itemRepository: PrismaItemRepository,
    private readonly customerRepsitory: PrismaCustomerRepository,
    private readonly paymentRepository: PrismaPaymentRepository,
    private readonly paymentProvider: MercadoPagoClient,
  ) {}

  @Post()
  createOrder(
    @Body() createOrderDto: OrderDto,
  ): Promise<{ order: OrderResponse; payment: Payment }> {
    return OrderController.createOrder(
      createOrderDto,
      this.orderRepository,
      this.itemRepository,
      this.customerRepsitory,
      this.paymentRepository,
      this.paymentProvider,
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
