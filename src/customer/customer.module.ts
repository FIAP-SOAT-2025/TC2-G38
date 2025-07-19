import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomerApi } from './infraestructure/api/controllers/customer.api';
import { PrismaService } from 'src/shared/infra/prisma.service';
import { PrismaCustomerRepository } from './infraestructure/persistence/prismaCustomer.repository';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [CustomerApi],
  providers: [PrismaService, PrismaCustomerRepository],
  exports: [],
})
export class CustomerModule {}
