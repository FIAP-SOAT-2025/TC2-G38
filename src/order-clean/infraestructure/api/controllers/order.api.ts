import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Payment } from 'src/payments/domain/model/payment.entity';
import OrderGatewayInterface from 'src/order-clean/interfaces/gateways';
import { OrderController } from 'src/order-clean/controllers/order.controller';
import { OrderDto } from '../dto/order.dto';
import { CompleteOrderResponse, OrderResponse } from '../dto/orderResponse.dto';
import { UpdateOrderStatusDto } from '../dto/update-status.dto';
import ItemGatewayInterface from 'src/arch_item/interfaces/itemGatewayInterface';

@ApiTags('Order')
@Controller('/order')
export class OrderApi {
  constructor(
    private readonly orderRepository: OrderGatewayInterface,
    private readonly itemRepository: ItemGatewayInterface,
  ) { }

  @Post()
  createOrder(
    @Body() createOrderDto: OrderDto,
  ): Promise<{ order: OrderResponse; payment: Payment }> {
    return OrderController.createOrder(createOrderDto, this.orderRepository, this.itemRepository);
  }

  @Get('/:id')
  find(@Param('id') id: string): Promise<CompleteOrderResponse> {
    return OrderController.find(id, this.orderRepository);
  }

  @Get()
  findAll(): Promise<CompleteOrderResponse[]> {
    return OrderController.findAll(this.orderRepository);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() statusDto: UpdateOrderStatusDto,
  ) {
    return OrderController.updateStatus(id, statusDto, this.orderRepository);
  }
}
