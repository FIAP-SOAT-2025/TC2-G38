import { PaymentResponseAdapter } from "../infrastructure/adapters/payment-response.adapter";
import PaymentGateway from "../gateways/payment.gateway";
import { PaymentRepositoryInterface } from "../interfaces/payment-repository.interface";
import { PaymentStatusEnum } from "../domains/enums/payment-status.enum";
import UpdatePaymentStatusUseCase from "../usecases/updatePaymentStatus.usecase";
import { EventEmitter } from "events";

export class PaymentController {
  constructor() {}

  static async updatePaymentStatus(
    paymentRepository: PaymentRepositoryInterface,
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