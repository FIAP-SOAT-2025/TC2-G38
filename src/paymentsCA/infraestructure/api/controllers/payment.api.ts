import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateStatusDto } from '../dto/update-status.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaymentController } from 'src/paymentsCA/controllers/payment.controller';
import { DbConnection } from 'src/paymentsCA/interfaces/db.connection';

@ApiTags('Payment')
@Controller('payment')
export class PaymentApi {
  private _dbconnection: DbConnection;

  constructor(dbconnection: DbConnection) {
    this._dbconnection = dbconnection;
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    
    await PaymentController.updatePaymentStatus(this._dbconnection, id,  updateStatusDto.status);
  }
}
