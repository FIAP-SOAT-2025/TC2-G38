import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaOrderRepository } from './infraestructure/persistence/order.repository';
import { PrismaItemRepository } from 'src/arch_item/infraestructure/persistence/prismaItem.repository';
import { OrderApi } from './infraestructure/api/controllers/order.api';
import { PrismaService } from 'src/shared/infra/prisma.service';
import { PrismaCustomerRepository } from 'src/customer/infraestructure/persistence/prismaCustomer.repository';
import { PrismaPaymentRepository } from 'src/payments/infrastructure/persistence/prismaPayment.repository';
import { MercadoPagoClient } from 'src/payments/infrastructure/external/mercado-pago/mercado-pago.client';
import { HttpService, HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [OrderApi],
  providers: [
    PrismaService,
    PrismaPaymentRepository,
    PrismaCustomerRepository,
    PrismaOrderRepository,
    PrismaItemRepository,
    MercadoPagoClient,
  ],
  exports: [],
})
export class OrderModule {}
