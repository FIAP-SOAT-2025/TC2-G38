import CustomerGatewayInterface from '../interfaces/gateways';
import { BaseException } from 'src/shared/exceptions/exceptions.base';
export default class DeleteCustomerUseCase {
  constructor(
  ) {}

  static async delete(
    id: string,
    customerGateway: CustomerGatewayInterface
  ): Promise<any> {

    const customerExists = await customerGateway.findById(id);
    if (!customerExists) {
      throw new BaseException(
        `Customer with id ${id} not found`,
        404,
        'CUSTOMER_NOT_FOUND'
      );  
    }
    return await customerGateway.delete(id);
  }
}

