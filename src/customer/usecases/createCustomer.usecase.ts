import { Customer, CustomerInterface } from "../entities/customer.entity";
import CustomerGatewayInterface from '../interfaces/gateways';
export default class CreateCustomer {
  constructor(
    
  ) {}

  static async create(newCustomer: CustomerInterface, customerGateway: CustomerGatewayInterface): Promise<Customer> {
    const customer = new Customer(newCustomer);
    const customerExistInBase = await customerGateway
      .findByCpfOrEmail(customer.cpf, customer.email)
      .catch((e) => {
        console.log(e);
      });

    if (customerExistInBase) {
      throw new Error('A customer is already registered.');
    }

    return await customerGateway.create(customer);
  }
}
