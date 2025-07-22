import { Payment } from '../../domains/entities/payment.entity';

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

  adaptJsonToMessage: function (data: { message: string }) {
    return JSON.stringify({ message: data.message });
  }
};