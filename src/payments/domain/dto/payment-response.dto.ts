import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatusEnum, PaymentTypeEnum } from '../model/payment.entity';

export class PaymentResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  orderId: string;

  @ApiProperty()
  status: PaymentStatusEnum;

  @ApiProperty()
  type: PaymentTypeEnum;

  @ApiProperty()
  mercadoPagoPaymentId: string;

  @ApiProperty()
  qrCode: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
