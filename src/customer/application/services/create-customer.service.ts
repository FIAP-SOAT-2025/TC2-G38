import { BadRequestException, Inject } from '@nestjs/common';
import { CreateCustomerDTO } from 'src/customer/domain/dto/create-customer.dto';
import { Customer } from 'src/customer/domain/model/customer.entity';
import CustomerRepository from 'src/customer/domain/repository/customer.repository';
import { CustomerServiceInterface } from 'src/customer/domain/services/create-customer.interface';

export default class CreateCustomerService implements CustomerServiceInterface {
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
  ) {}

  async create(newCustomer: CreateCustomerDTO): Promise<Customer> {
    const customer = new Customer(newCustomer);
    const customerExistInBase = await this.customerRepository
      .findByCpfOrEmail(customer.cpf, customer.email)
      .catch((e) => {
        console.log(e);
      });

    if (customerExistInBase) {
      throw new BadRequestException('A customer is already registered.');
    }

    return await this.customerRepository.create(customer);
  }
}
