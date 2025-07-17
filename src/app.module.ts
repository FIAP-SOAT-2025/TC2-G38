import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './shared/infra/prisma.service';
import { CustomerModule } from './customer/customer.module';
import { InternalUserModule } from './user/internaluser.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payments/payment.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ItemModule } from './arch_item/item.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ItemModule,
    CustomerModule,
    InternalUserModule,
    //OrderModule,
    PaymentModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
