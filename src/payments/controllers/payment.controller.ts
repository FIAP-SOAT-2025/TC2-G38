import { PaymentResponseAdapter } from "../infrastructure/adapters/payment-response.adapter";
import { UpdatePaymentGatewayInterface } from "src/payments/interfaces/update-payment-gateways.interface";
import { PaymentStatusEnum } from "../domains/enums/payment-status.enum";
import UpdatePaymentStatusUseCase from "../usecases/updatePaymentStatus.usecase";
import { EventEmitter } from "events";
export class PaymentController {
  constructor() {}

  static async updatePaymentStatus(
    paymentGateway: UpdatePaymentGatewayInterface,
    id: string,
    newStatus: PaymentStatusEnum
  ) {
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