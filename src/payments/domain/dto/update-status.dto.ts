import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { PaymentStatusEnum } from "../model/payment.entity";

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