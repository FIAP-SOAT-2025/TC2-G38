import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatusEnum } from 'src/payments/domain/enums/payment-status.enum';
import { PaymentTypeEnum } from 'src/payments/domain/enums/payment-type.enum';

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
