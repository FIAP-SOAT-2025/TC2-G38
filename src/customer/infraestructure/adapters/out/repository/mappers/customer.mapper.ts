import { Customer } from 'src/customer/domain/model/customer.entity';
import { Customer as PrismaCustomer } from '@prisma/client';

export class CustomerMapper {
  static mapRepositoryToCustomerEntity(prismaCustomer: PrismaCustomer): Customer {
    return new Customer({
      id: prismaCustomer.id,
      name: prismaCustomer.name,
      cpf: prismaCustomer.cpf,
      email: prismaCustomer.email,
      createdAt: prismaCustomer.createdAt,
      updatedAt: prismaCustomer.updatedAt,
    });
  }
}