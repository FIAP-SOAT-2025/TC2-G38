import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import FindOrderService from 'src/order/application/findOrder.service';
import ProcessOrderService from 'src/order/application/processOrder.service';
import UpdateOrderService from 'src/order/application/updateOrder.service';
import { OrderDto } from 'src/order/domain/dto/order.dto';
import {
  CompleteOrderResponse,
  OrderResponse,
} from 'src/order/domain/dto/orderResponse.dto';
import { UpdateOrderStatusDto } from 'src/order/domain/dto/update-status.dto';
import { Payment } from 'src/payments/domains/entities/payment.entity';
@ApiTags('Order')
@Controller('/order')
export class OrderController {
  constructor(
    private readonly orderService: ProcessOrderService,
    private readonly listOrderService: FindOrderService,
    private readonly updateOrderService: UpdateOrderService,
  ) {}

  @Post()
  async createOrder(
    @Body() createOrderDto: OrderDto,
  ): Promise<{ order: OrderResponse; payment: Payment }> {
    return await this.orderService.process(createOrderDto);
  }

  @Get('/:id')
  async find(@Param('id') id: string): Promise<CompleteOrderResponse> {
    return await this.listOrderService.find(id);
  }

  @Get()
  async findAll(): Promise<CompleteOrderResponse[]> {
    return await this.listOrderService.findAll();
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() statusDto: UpdateOrderStatusDto,
  ) {
    return await this.updateOrderService.updateStatus(id, statusDto.status);
  }
}
