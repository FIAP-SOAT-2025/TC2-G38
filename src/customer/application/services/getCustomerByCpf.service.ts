import { Customer } from 'src/customer/domain/model/customer.entity';
import CustomerRepository from 'src/customer/domain/repository/customer.repository';
import { Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { GetCustomerByCpfServiceInterface } from 'src/customer/domain/services/getCustomerByCpf.service.interface';
import onlyNumbers from 'src/shared/utils/string';

export default class GetCustomerByCpfService
  implements GetCustomerByCpfServiceInterface
{
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
  ) {}

  async getCustomerByCpf(cpf: string): Promise<Customer> {
    try {
      const customer = await this.customerRepository.findByCpf(
        onlyNumbers(cpf),
      );
      if (!customer) {
        throw new BadRequestException('Customer not found');
      }
      return customer;
    } catch (error) {
      throw new NotFoundException('Failed to fetch customer by CPF');
    }
  }
}
