import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateStatusDto } from 'src/payments/domain/dto/update-status.dto';
import { UpdatePaymentStatusService } from 'src/payments/application/update-payment-status.service';
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentStatus: UpdatePaymentStatusService) {}

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.paymentStatus.update(id, updateStatusDto.status);
  }
}
