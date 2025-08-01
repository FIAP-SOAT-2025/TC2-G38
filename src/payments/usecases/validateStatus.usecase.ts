import { BaseException } from "src/shared/exceptions/exceptions.base";
import { Payment, PaymentStatusEnum } from '../domain/entities/payment.entity';
export default class ValidateStatusUseCase {
    constructor() {}
  static validate(payment: Payment, newStatus: PaymentStatusEnum, id: string): void {
    if (payment.status === newStatus) {
      throw new BaseException(
        `Payment with ID ${id} is already in ${payment.status} status`,
        409,
        'PAYMENT_ALREADY_IN_STATUS'
      );
    }

    if (payment.status === PaymentStatusEnum.APPROVED) {
      throw new BaseException(
        `Payment with ID ${id} is approved and cannot be updated.`,
        409,
        'PAYMENT_ALREADY_APPROVED'
      );
    }
  }
}  