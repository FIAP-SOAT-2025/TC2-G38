import { Customer, CustomerInterface } from "../entities/customer.entity";
import CustomerGatewayInterface from '../interfaces/gateways';
import { CustomerPresenter } from "../presenters/customer.presenter";
export default class CreateCustomer {
  constructor(
    
  ) {}

  static async create(newCustomer: CustomerInterface, customerGateway: CustomerGatewayInterface): Promise<CustomerInterface> {
    const customer = new Customer(newCustomer);
    const customerExistInBase = await customerGateway.findByCpfOrEmail(customer.cpf, customer.email)
    if (customerExistInBase) {
      throw new Error('A customer is already registered.');
    }
    return CustomerPresenter.formatCustomerToJson(await customerGateway.create(customer));
  }
}
