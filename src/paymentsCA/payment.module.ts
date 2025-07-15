import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/shared/infra/prisma.service';
import { PrismaPaymentRepository } from 'src/payments/infraestructure/out/repository/prisma-payment.repository'; 
import { PaymentApi } from './infrastructure/api/controllers/payment.api';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PaymentApi],
  providers: [PrismaService, PrismaPaymentRepository],
  exports: [],
})
export class CustomerModule {}