import { Customer, CustomerInterface } from "../entities/customer.entity";
import CustomerGatewayInterface from '../interfaces/gateways';
import { BaseException } from 'src/shared/exceptions/exceptions.base';
export default class CreateCustomer {
  constructor(
    
  ) {}

  static async create(newCustomer: CustomerInterface, customerGateway: CustomerGatewayInterface): Promise<Customer> {
    const customer = new Customer(newCustomer);
    const customerExistInBase = await customerGateway.findByCpfOrEmail(customer.cpf, customer.email)
    if (customerExistInBase) {
      throw new BaseException('Customer already exists.', 409, 'CUSTOMER_ALREADY_EXISTS');
    }
    return await customerGateway.create(customer);
  }
}
