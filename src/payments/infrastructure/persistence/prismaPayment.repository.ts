import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../shared/infra/prisma.service";
import { PaymentTypeEnum } from "src/payments/domain/enums/payment-type.enum";
import { PaymentStatusEnum } from "src/payments/domain/enums/payment-status.enum";
import { PaymentGatewayInterface } from "src/payments/interfaces/payment-gateway.interface";

@Injectable()
export class PrismaPaymentRepository implements PaymentGatewayInterface {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    orderId: string,
    type: PaymentTypeEnum,
    status: PaymentStatusEnum,
    mercadoPagoPaymentId: string,
    qrCode: string,
  ): Promise<any> {
    try {
      return await this.prisma.payment.create({
        data: {
          orderId: orderId,
          type: type as PaymentTypeEnum,
          status: status as PaymentStatusEnum,
          mercadoPagoPaymentId: mercadoPagoPaymentId,
          qrCode: qrCode,
        },
      });
    } catch (error) {
      console.error('Error creating payment, payment repository:', error);
      throw new Error('Failed to create payment');
    }
  }
  
  async updatePaymentStatus(
    paymentId: string,
    status: PaymentStatusEnum,
  ): Promise<any> {
    try {
      return await this.prisma.payment.update({
        where: { id: paymentId },
        data: { status },
      });
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw new Error('Failed to update payment status');
    }
  }

  async find(id: string): Promise<any> {
    const payment = await  this.prisma.payment.findUnique({
      where: { id: id },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }
}