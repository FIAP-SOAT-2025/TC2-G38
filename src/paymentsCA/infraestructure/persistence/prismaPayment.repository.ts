import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../shared/infra/prisma.service";
import { PaymentStatusEnum } from "../../../paymentsCA/entities/payment.entity";
import PaymentGatewayInterface from "../../../paymentsCA/interfaces/gateways";

@Injectable()
export class prismaPaymentRepository implements PaymentGatewayInterface {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async updateStatus(
    paymentId: string, 
    status: PaymentStatusEnum,
  ): Promise<{ message: string }> {
    try {
      await this.prisma.payment.update({
        where: { id: paymentId },
        data: {
          status: status as PaymentStatus,
        },
      });

      return { message: 'Payment status updated successfully' };
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw new Error('Failed to update payment status');
    }
  }
}