import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/shared/infra/prisma.service';
import { PrismaPaymentRepository } from './infrastructure/persistence/prismaPayment.repository';
import { PaymentApi } from './infrastructure/api/controllers/payment.api';
import { PrismaCustomerRepository } from 'src/customer/infraestructure/persistence/prismaCustomer.repository';
import { PrismaOrderRepository } from 'src/order/infraestructure/persistence/order.repository';
import { PrismaItemRepository } from 'src/item/infraestructure/persistence/prismaItem.repository';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PaymentApi],
  providers: [PrismaService, PrismaPaymentRepository, PrismaCustomerRepository, PrismaOrderRepository, PrismaItemRepository],
  exports: [],
})
export class PaymentModule {}