import { Customer, CustomerInterface } from '../entities/customer.entity';
import CustomerGatewayInterface from '../interfaces/gateways';

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
      return false
    }
    const updatedCustomer = await customerGateway.update(id, customer, customerExists);
    return updatedCustomer;
  }
}
