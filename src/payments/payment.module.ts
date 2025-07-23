import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/shared/infra/prisma.service';
import { PrismaPaymentRepository } from './infrastructure/persistence/prismaPayment.repository';
import { PaymentApi } from './infrastructure/api/controllers/payment.api';
import { PrismaCustomerRepository } from 'src/customer/infraestructure/persistence/prismaCustomer.repository';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PaymentApi],
  providers: [PrismaService, PrismaPaymentRepository, PrismaCustomerRepository],
  exports: [],
})
export class PaymentModule {}