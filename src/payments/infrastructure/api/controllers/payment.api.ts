import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateStatusDto } from '../dto/update-status.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaymentController } from 'src/payments/controllers/payment.controller';
import { PrismaPaymentRepository } from 'src/payments/infrastructure/persistence/prismaPayment.repository';
import { PrismaOrderRepository } from 'src/order/infraestructure/persistence/order.repository';
import { PrismaItemRepository } from 'src/item/infraestructure/persistence/prismaItem.repository';

@ApiTags('Payment')
@Controller('/payment')
export class PaymentApi {
  constructor(
    private readonly prismaPaymentRepository: PrismaPaymentRepository,
    private readonly prismaOrderRepository: PrismaOrderRepository,
    private readonly prismaItemRepository: PrismaItemRepository,
  ) {}
  @Patch('webhook/status/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return await PaymentController.updatePaymentStatus(
      this.prismaPaymentRepository,
      this.prismaOrderRepository,
      this.prismaItemRepository,
      id,
      updateStatusDto.status
    );
  }
  /*@Get('/status/:id')
  async getStatus(@Param('id') id: string) {
    console.log('----------------------------API Get payment status:', id);
    return await PaymentController.getPaymentStatus(
      this.prismaPaymentRepository,
      id
    );
  }*/
}
