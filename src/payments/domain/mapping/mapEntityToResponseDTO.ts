import { Payment } from '../model/payment.entity';
import { PaymentResponse } from '../dto/payment-response.dto';

export class PaymentMapper {
  static mapPaymentToPaymentResponseDTO(
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
