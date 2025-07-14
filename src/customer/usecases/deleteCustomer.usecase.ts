// import { Inject } from '@nestjs/common';
// import CustomerRepository from 'src/customer/domain/repository/customer.repository';
// import { DeleteCustomerServiceInterface } from 'src/customer/domain/services/delete-customer.interface';

// export default class DeleteCustomerService
//   implements DeleteCustomerServiceInterface
// {
//   constructor(
//     @Inject('CustomerRepository')
//     private readonly customerRepository: CustomerRepository,
//   ) {}

//   async delete(id: string): Promise<void> {
//     await this.customerRepository.delete(id);
//   }
// }
