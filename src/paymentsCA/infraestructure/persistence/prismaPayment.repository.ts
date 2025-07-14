import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../shared/infra/prisma.service";
import { Payment, PaymentStatusEnum } from "../../controllers/entities/payment.entity";
import PaymentGatewayInterface from "../../../paymentsCA/interfaces/gateways";
import { mapPrismaPaymentToPaymentEntity } from "../adapters/prisma-payment.mapper";

@Injectable()
export class prismaPaymentRepository implements PaymentGatewayInterface {
  constructor(private readonly prisma: PrismaService) {}
  
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
}