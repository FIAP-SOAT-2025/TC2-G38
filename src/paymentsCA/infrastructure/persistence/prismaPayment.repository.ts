import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../shared/infra/prisma.service";
import { Payment, PaymentStatusEnum } from "../../domains/entities/payment.entity";
import PaymentGatewayInterface from "../../interfaces/gateways";
import { mapPrismaPaymentToPaymentEntity } from "../adapters/prisma-payment.mapper";
import { PrismaCustomerRepository } from "src/customer/infraestructure/adapters/out/repository/prismaCustomer.repository";

@Injectable()
export class PrismaPaymentRepository implements PaymentGatewayInterface {
  constructor(private readonly prisma: PrismaService,
    private readonly customerRepository: PrismaCustomerRepository,// AJUSTAR ESSE IMPORT DE CUSTOMER
  ) {}
  
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