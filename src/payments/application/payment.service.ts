import { Inject, Injectable } from '@nestjs/common';
import PaymentRepository from '../domain/repository/payment.repository';
import {
  Payment,
  PaymentStatusEnum,
  PaymentTypeEnum,
} from '../domain/model/payment.entity';
import PaymentProviderRepository from '../domain/repository/payment-provider.repository';
import { CreatePaymentServiceInterface } from '../domain/services/payment.service.interface';

@Injectable()
export class CreatePaymentService implements CreatePaymentServiceInterface {
  constructor(
    @Inject('PaymentRepository')
    private readonly payment: PaymentRepository,
    @Inject('PaymentProviderRepository')
    private readonly paymentProvider: PaymentProviderRepository,
  ) {}

  async createPayment(orderId: string, totalAmount: number): Promise<Payment> {
    try {
      const response = await this.paymentProvider.callPaymentApi(
        orderId,
        totalAmount,
      );
      const paymentId = String(response.id);
      const qrCode = response.point_of_interaction?.transaction_data?.qr_code;
      const status = (response.status as string).toUpperCase();

      return await this.payment.create(
        orderId,
        PaymentTypeEnum.PIX,
        status as PaymentStatusEnum,
        paymentId,
        qrCode,
      );
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  }
}
