import { Customer, CustomerInterface } from '../entities/customer.entity';
import CustomerGatewayInterface from '../interfaces/gateways';

export default class DeleteCustomerUseCase {
  constructor(
  ) {}

  static async delete(
    id: string,
    customerGateway: CustomerGatewayInterface
  ): Promise<any> {

    const customerExists = await customerGateway.findById(id);
    if (!customerExists) {
      return false
    }
    await customerGateway.delete(id);
    return true;
  }
}

