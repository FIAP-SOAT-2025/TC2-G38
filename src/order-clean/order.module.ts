import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaOrderRepository } from './infraestructure/persistence/order.repository';
import { PrismaItemRepository } from 'src/arch_item/infraestructure/persistence/prismaItem.repository';
import { OrderApi } from './infraestructure/api/controllers/order.api';
import { PrismaService } from 'src/shared/infra/prisma.service';
import { PrismaCustomerRepository } from 'src/customer/infraestructure/persistence/prismaCustomer.repository';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [OrderApi],
  providers: [
    PrismaService,
    PrismaCustomerRepository,
    PrismaOrderRepository,
    PrismaItemRepository,
  ],
  exports: [],
})
export class OrderModule {}
