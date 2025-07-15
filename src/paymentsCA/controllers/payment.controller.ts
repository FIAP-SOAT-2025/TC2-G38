import { PaymentResponseAdapter } from "../infrastructure/adapters/payment-response.adapter";
import PaymentGateway from "../gateways/payment.gateway";
import { PaymentInterface } from "../interfaces/payment";
import { PaymentStatusEnum } from "../domains/enums/payment-status.enum";
import UpdatePaymentStatusUseCase from "../usecases/updatePaymentStatus.usecase";

import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();

export class PaymentController {
  constructor() {}

  static async updatePaymentStatus(
    paymentRepository: PaymentInterface,
    id: string,
    newStatus: PaymentStatusEnum
  ) {
    const paymentGateway = new PaymentGateway(paymentRepository);
    const eventEmitter = new EventEmitter();
    const useCase = new UpdatePaymentStatusUseCase(eventEmitter);
    const updatedPayment = await useCase.updateStatus(
      paymentGateway,
      id,
      newStatus
    );
    return PaymentResponseAdapter.adaptJsonToMessage(updatedPayment);
  }
}