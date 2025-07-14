import { PaymentResponseAdapter } from "../infrastructure/adapters/payment-response.adapter";
import PaymentGateway from "../gateways/payment.gateway";
import { DbConnection } from "../interfaces/db.connection";
import { PaymentStatusEnum } from "../shared/enums/payment-status.enum";
import UpdatePaymentStatusUseCase from "../usecases/updatePaymentStatus.usecase";

import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();

export class PaymentController {
  static async updatePaymentStatus(
    prisma: DbConnection,
    id: string,
    newStatus: PaymentStatusEnum
  ) {
    const paymentGateway = new PaymentGateway(prisma);
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