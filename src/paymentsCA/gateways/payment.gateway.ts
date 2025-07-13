import { PrismaService } from "src/shared/infra/prisma.service";
import { Payment } from "../entities/payment.entity";
import { PaymentStatusEnum } from "../shared/enums/payment-status.enum";
import PaymentGatewayInterface from "../interfaces/gateways";

class PaymentGateway implements PaymentGatewayInterface {
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
  
}

export { PaymentGateway};