import { Payment } from '../domain/entities/payment.entity';
import { PaymentResponse } from '../infrastructure/api/dto/payment-response.dto';

export class PaymentMapper {
  static mapPaymentToPaymentResponse (
    paymentParam: Payment,
  ): PaymentResponse {
    const payment = new PaymentResponse();
    payment.id = paymentParam.id;
    payment.orderId = paymentParam.orderId;
    payment.status = paymentParam.status;
    payment.type = paymentParam.type;

    return payment;
  }
}
