import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../shared/infra/prisma.service";
import { Payment } from "../../domains/entities/payment.entity";
import { PaymentTypeEnum } from "src/payments/domains/enums/payment-type.enum";
import { PaymentStatusEnum } from "src/payments/domains/enums/payment-status.enum";
import { mapPrismaPaymentToPaymentEntity } from "../adapters/prisma-payment.mapper";
import { PrismaCustomerRepository } from "src/customer/infraestructure/persistence/prismaCustomer.repository";
import { PaymentGatewayInterface } from "src/payments/interfaces/payment-gateway.interface";

@Injectable()
export class PrismaPaymentRepository implements PaymentGatewayInterface {
  constructor(private readonly prisma: PrismaService,
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
            type: type as PaymentTypeEnum,
            status: status as PaymentStatusEnum,
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
          data: { status },
        });
        return mapPrismaPaymentToPaymentEntity(updatedPayment);
      } catch (error) {
        console.error('Error updating payment status:', error);
        throw new Error('Failed to update payment status');
      }
    }

  async find(id: string): Promise<Payment> {
      const payment = await  this.prisma.payment.findUnique({
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