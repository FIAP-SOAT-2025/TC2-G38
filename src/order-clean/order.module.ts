import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaOrderRepository } from './infraestructure/persistence/order.repository';
import { PrismaItemRepository } from 'src/arch_item/infraestructure/persistence/prismaItem.repository';
import { OrderApi } from './infraestructure/api/controllers/order.api';
import { PrismaService } from 'src/shared/infra/prisma.service';
import { PrismaCustomerRepository } from 'src/customer/infraestructure/persistence/prismaCustomer.repository';
import { PrismaPaymentRepository } from 'src/payments/infrastructure/persistence/prismaPayment.repository';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [OrderApi],
  providers: [
    PrismaService,
    {
      provide: 'OrderGatewayInterface',
      useClass: PrismaOrderRepository,
    },
    {
      provide: 'ItemGatewayInterface',
      useClass: PrismaItemRepository,
    },
    {
      provide: 'CustomerGatewayInterface',
      useClass: PrismaCustomerRepository,
    },
    {
      provide: 'PaymentRepositoryInterface',
      useClass: PrismaPaymentRepository,
    },
    PrismaPaymentRepository,
    PrismaCustomerRepository,
    PrismaOrderRepository,
    PrismaItemRepository,
  ],
  exports: [],
})
export class OrderModule {}
