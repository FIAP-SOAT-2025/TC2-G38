import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/shared/infra/prisma.service';
import ProcessOrderService from './application/processOrder.service';
import { OrderController } from './infrastructure/adapters/in/controller/order.controller';
import { PrismaOrderRepository } from './infrastructure/adapters/out/repository/order.repository';
import { PrismaCustomerRepository } from 'src/customer/infraestructure/persistence/prismaCustomer.repository';
import FindOrderService from './application/findOrder.service';
import { PaymentModule } from 'src/payments/payment.module';
import UpdateOrderService from './application/updateOrder.service';
import { ItemModule } from 'src/arch_item/item.module';
import { CreatePaymentService } from 'src/payments/application/payment.service';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { PrismaItemRepository } from 'src/arch_item/infraestructure/persistence/prismaItem.repository';
import UpdateItemUseCase from 'src/arch_item/useCases/updateItem.useCase';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PaymentModule,
    ItemModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [OrderController],
  providers: [
    ProcessOrderService,
    FindOrderService,
    UpdateOrderService,
    PrismaService,

    {
      provide: 'OrderRepository',
      useClass: PrismaOrderRepository,
    },
    {
      provide: 'ItemRepository',
      useClass: PrismaItemRepository,
    },
    {
      provide: 'CustomerRepository',
      useClass: PrismaCustomerRepository,
    },
    {
      provide: 'FindOrderServiceInterface',
      useExisting: FindOrderService,
    },
    {
      provide: 'UpdateOrderServiceInterface',
      useExisting: UpdateOrderService,
    },
    {
      provide: 'UpdateItemServiceInterface',
      useExisting: UpdateItemUseCase,
    },
    {
      provide: 'CreatePaymentServiceInterface',
      useExisting: CreatePaymentService,
    },
    {
      provide: 'IEventEmitter',
      useClass: EventEmitter2,
    },
    PrismaService,
  ],
  exports: [ProcessOrderService, FindOrderService, UpdateOrderService],
})
export class OrderModule {}
