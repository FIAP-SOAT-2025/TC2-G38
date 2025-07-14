import { BadRequestException } from "@nestjs/common";
import PaymentGatewayInterface from "../interfaces/gateways";
import { PaymentStatusEnum } from "../shared/enums/payment-status.enum";
import { IEventEmitter } from "src/shared/event/domain/eventEmitterInterface";
import { DbConnection } from "../interfaces/db.connection";
import { Payment } from "../controllers/entities/payment.entity";

export default class PaymentGateway implements PaymentGatewayInterface {
  private dbRepository: DbConnection;
  constructor(connection: DbConnection) {
    this.dbRepository = connection;
  }

 async updateStatus( paymentId: string, status: PaymentStatusEnum): Promise<Payment> {
    const updatedPayment = await this.dbRepository.updateStatus(paymentId, status);

    return updatedPayment;
  }
 
  async find(id: string): Promise<Payment> {
    const payment = await this.dbRepository.find(id);
    if (!payment) {
      throw new Error(`Payment with ID ${id} not found`);
    }
    return payment;
  }
}
