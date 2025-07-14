// import { Customer } from 'src/customer/domain/model/customer.entity';
// import CustomerRepository from 'src/customer/domain/repository/customer.repository';
// import { UpdateCustomerServiceInterface } from 'src/customer/domain/services/updateCustomer.service.interface';
// import { UpdateCustomerDTO } from 'src/customer/domain/dto/update-customer.dto';
// import { Inject, BadRequestException } from '@nestjs/common';

// export default class UpdateCustomerService
//   implements UpdateCustomerServiceInterface
// {
//   constructor(
//     @Inject('CustomerRepository')
//     private readonly customerRepository: CustomerRepository,
//   ) {}

//   async updated(
//     id: string,
//     customer: Partial<UpdateCustomerDTO>,
//   ): Promise<Customer> {
//     if (!id) {
//       throw new BadRequestException('ID is required');
//     }

//     if (!customer.name?.trim()) {
//       throw new BadRequestException('Name cannot be empty');
//     }
//     const customerExists = await this.customerRepository.findById(id);
//     if (!customerExists) {
//       throw new BadRequestException('Customer not found');
//     }
//     return await this.customerRepository.update(id, customer, customerExists);
//   }
// }
