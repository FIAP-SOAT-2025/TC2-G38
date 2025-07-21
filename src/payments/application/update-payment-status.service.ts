import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PaymentStatusEnum } from '../domain/model/payment.entity';
import PaymentRepository from '../domain/repository/payment.repository';
import { IEventEmitter } from 'src/shared/event/domain/eventEmitterInterface';
import { UpdatePaymentStatusServiceInterface } from '../domain/services/payment.service.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UpdatePaymentStatusService
  implements UpdatePaymentStatusServiceInterface
{
  constructor(
    @Inject('PaymentRepository')
    private readonly prismaPaymentRepository: PaymentRepository,
    @Inject('IEventEmitter')
    private readonly eventEmitter: IEventEmitter,
  ) {}

  async update(
    id: string,
    newStatus: PaymentStatusEnum,
  ): Promise<{ message: string }> {
    const { status } = await this.prismaPaymentRepository.find(id);

    if (status === newStatus) {
      throw new BadRequestException(
        `Payment with ID ${id} is already in ${status} status`,
      );
    }

    if (status === PaymentStatusEnum.APPROVED) {
      throw new BadRequestException(
        `Payment with ID ${id} is approved and cannot be updated.`,
      );
    }

    await this.prismaPaymentRepository
      .updateStatus(id, newStatus)
      .then(({ orderId }) => {
        if (newStatus === PaymentStatusEnum.APPROVED) {
          this.eventEmitter.emit('payment.approved', { orderId });
        }
      });

    return {
      message: `Payment with ID ${id} updated successfully`,
    };
  }
}
