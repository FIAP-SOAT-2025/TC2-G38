import { CustomerInterface } from '../entities/customer.entity';
import CustomerGatewayInterface from '../interfaces/gateways';
import { BaseException } from 'src/shared/exceptions/exceptions.base';

export default class UpdateCustomerUseCase {
  constructor(
  ) {}

  static async updated(
    id: string,
    customer: Partial<CustomerInterface>,
    customerGateway: CustomerGatewayInterface
  ): Promise<any> {
    
    const customerExists = await customerGateway.findById(id);
    if (!customerExists) {
      throw new BaseException('Customer not found', 404, 'CUSTOMER_NOT_FOUND');
    }
    const updatedCustomer = await customerGateway.update(id, customer, customerExists);
    return updatedCustomer;
  }
}
