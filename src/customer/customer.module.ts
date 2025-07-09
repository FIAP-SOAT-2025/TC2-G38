import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/shared/infra/prisma.service';
import { PrismaCustomerRepository } from './infraestructure/adapters/out/repository/prismaCustomer.repository';
import UpdateCustomerService from './application/services/updateCustomer.service';
import DeleteCustomerService from './application/services/delete-customer.service';
import { CustomerController } from './infraestructure/adapters/in/controller/customer.controller';
import CreateCustomerService from './application/services/create-customer.service';
import GetCustomerByCpfService from './application/services/getCustomerByCpf.service';
@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [CustomerController],
  providers: [
    {
      provide: 'UpdateCustomerService',
      useClass: UpdateCustomerService,
    },
    {
      provide: 'CreateCustomerService',
      useClass: CreateCustomerService,
    },
    {
      provide: 'CustomerRepository',
      useClass: PrismaCustomerRepository,
    },
    {
      provide: 'DeleteCustomerService',
      useClass: DeleteCustomerService,
    },
    {
      provide: 'GetCustomerByCpfService',
      useClass: GetCustomerByCpfService,
    },
    PrismaService,
    PrismaCustomerRepository,
  ],
  exports: [
    'CustomerRepository',
    PrismaCustomerRepository
  ],
})
export class CustomerModule {}
