import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateStatusDto } from '../dto/update-status.dto';
import { UpdatePaymentStatusService } from 'src/payments/application/update-payment-status.service';
import { ApiTags } from '@nestjs/swagger';
import { PaymentController } from 'src/paymentsCA/controllers/payment.controler';

@ApiTags('Payment')
@Controller('payment')
export class PaymentApi {
  constructor(private readonly paymentStatus: UpdatePaymentStatusService) {}

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
   // return this.paymentStatus.update(id, updateStatusDto.status);
    await PaymentController.updateStatus(id, updateStatusDto.status);
  }
}
