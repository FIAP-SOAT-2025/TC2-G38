import { Payment } from '../../domain/entities/payment.entity';

export const PaymentResponseAdapter = {
  adaptJsonToPayment: function (data: Payment | null) {
    if (data === null) {
      return JSON.stringify({});
    }

    return JSON.stringify({
      id: data.id,
      orderId: data.orderId,
      status: data.status,
      type: data.type,
      mercadoPagoPaymentId: data.mercadoPagoPaymentId,
      qrCode: data.qrCode,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  },

  adaptJsonToMessage: function (data: Payment) {
    return JSON.stringify(data);
  }
};