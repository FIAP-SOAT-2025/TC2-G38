import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { PaymentStatusEnum } from "src/payments/domain/enums/payment-status.enum";

export class UpdateStatusDto {
  constructor(
    status: PaymentStatusEnum,
  ) {
    this.status = status;
  }

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PaymentStatusEnum)
  status: PaymentStatusEnum;
}