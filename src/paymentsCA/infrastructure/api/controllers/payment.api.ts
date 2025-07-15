import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateStatusDto } from '../dto/update-status.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaymentController } from 'src/paymentsCA/controllers/payment.controller';
import { PrismaPaymentRepository } from 'src/paymentsCA/infrastructure/persistence/prismaPayment.repository';

@ApiTags('Payment')
@Controller('/payment')
export class PaymentApi {
  constructor(
    private readonly prismaPaymentRepository: PrismaPaymentRepository
  ) {}

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    
    await PaymentController.updatePaymentStatus(
      this.prismaPaymentRepository,
      id,
      updateStatusDto.status
    );
  }
}
