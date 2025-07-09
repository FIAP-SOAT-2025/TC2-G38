import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentStatus, PaymentType } from '@prisma/client';
import { PrismaCustomerRepository } from 'src/customer/infraestructure/adapters/out/repository/prismaCustomer.repository';
import { PrismaService } from 'src/shared/infra/prisma.service';
import {
  Payment,
  PaymentStatusEnum,
  PaymentTypeEnum,
} from 'src/payments/domain/model/payment.entity';
import { mapPrismaPaymentToPaymentEntity } from './mappings/mapPrismaPaymentToPaymentEntity';
import PaymentRepository from 'src/payments/domain/repository/payment.repository';

@Injectable()
export class PrismaPaymentRepository implements PaymentRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly customerRepository: PrismaCustomerRepository,
  ) {}

  async create(
    orderId: string,
    type: PaymentTypeEnum,
    status: PaymentStatusEnum,
    mercadoPagoPaymentId: string,
    qrCode: string,
  ): Promise<Payment> {
    try {
      const payment = await this.prisma.payment.create({
        data: {
          orderId: orderId,
          type: type as PaymentType,
          status: status as PaymentStatus,
          mercadoPagoPaymentId: mercadoPagoPaymentId,
          qrCode: qrCode,
        },
      });

      return mapPrismaPaymentToPaymentEntity(payment);
    } catch (error) {
      console.error('Error creating payment:', error);
      throw new Error('Failed to create payment');
    }
  }

  async updateStatus(
    paymentId: string,
    status: PaymentStatusEnum,
  ): Promise<Payment> {
    try {
      const updatedPayment = await this.prisma.payment.update({
        where: { id: paymentId },
        data: {
          status: status as PaymentStatus,
        },
      });

      return mapPrismaPaymentToPaymentEntity(updatedPayment);
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw new Error('Failed to update payment status');
    }
  }

  async find(id: string): Promise<Payment> {
    const payment = await this.prisma.payment.findUnique({
      where: { id: id },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return mapPrismaPaymentToPaymentEntity(payment);
  }

  async getOrGenerateCustomerEmail(orderId: string): Promise<string> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!order?.customerId) return `anonymous+${orderId}@gmail.com`;

    return this.customerRepository.getEmailById(order.customerId);
  }
}
