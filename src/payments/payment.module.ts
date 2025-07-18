import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CreatePaymentService } from './application/payment.service';
import { PaymentController } from './infraestructure/in/controller/payment.controller';
import { PrismaService } from 'src/shared/infra/prisma.service';
import { PrismaPaymentRepository } from './infraestructure/out/repository/prisma-payment.repository';
import { ConfigModule } from '@nestjs/config';
import { UpdatePaymentStatusService } from './application/update-payment-status.service';
import { CustomerModule } from '../customer/customer.module';
import { MercadoPagoClient } from './infraestructure/out/repository/mercado-pago/mercado-pago.client';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
//REVER IMPORT DO REPOSITORY
import { PrismaCustomerRepository } from 'src/customer/infraestructure/persistence/prismaCustomer.repository';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    CustomerModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [PaymentController],
  providers: [
    CreatePaymentService,
    UpdatePaymentStatusService,
    PrismaPaymentRepository,
    {
      provide: 'PaymentRepository',
      useClass: PrismaPaymentRepository,
    },
    {
      provide: 'PaymentProviderRepository',
      useClass: MercadoPagoClient,
    },
    {
      provide: 'IEventEmitter',
      useExisting: EventEmitter2,
    },
    {
      provide: 'CreatePaymentServiceInterface',
      useExisting: CreatePaymentService,
    },
    {
      provide: 'UpdatePaymentStatusServiceInterface',
      useExisting: UpdatePaymentStatusService,
    },
    PrismaService,
    MercadoPagoClient,
    PrismaCustomerRepository
  ],
  exports: [
    CreatePaymentService,
    'CreatePaymentServiceInterface',
    UpdatePaymentStatusService,
  ],
})
export class PaymentModule {}
