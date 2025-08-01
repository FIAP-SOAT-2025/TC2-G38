import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './shared/infra/prisma.service';
import { CustomerModule } from './customer/customer.module';
import { PaymentModule } from './payments/payment.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { InternalUserModule } from './internalUser/internaluser.module';
import { OrderModule } from './order/order.module';
import { ItemModule } from './item/item.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HealthModule,
    ItemModule,
    CustomerModule,
    InternalUserModule,
    OrderModule,
    PaymentModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
