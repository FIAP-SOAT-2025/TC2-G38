export class PaymentPresenter {
  static toResponse(payment: any): any {
    return {
      id: payment.id ?? "",
      orderId: payment.orderId,
      status: payment.status,
      type: payment.type,
      mercadoPagoPaymentId: payment.mercadoPagoPaymentId,
      qrCode: payment.qrCode,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt
    };
  }
}