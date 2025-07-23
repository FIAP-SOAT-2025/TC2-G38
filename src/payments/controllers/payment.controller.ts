import { PaymentStatusEnum } from "../domains/enums/payment-status.enum";
import UpdatePaymentStatusUseCase from "../usecases/updatePaymentStatus.usecase";
import { EventEmitter } from "events";
import { PaymentGatewayInterface } from "../interfaces/payment-gateway.interface";
import { PaymentMapper } from "../presenter/mapEntityToResponse.dto";
export class PaymentController {
  constructor() {}

  static async updatePaymentStatus(
    paymentGateway: PaymentGatewayInterface,
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

    return PaymentMapper.mapPaymentToPaymentResponse(updatedPayment);
  }
}