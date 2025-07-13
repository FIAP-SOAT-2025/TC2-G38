
import { CustomerGateway } from "../gateways/customer.gateway"
import CustomerGatewayInterface from "../interfaces/gateways";
import GetCustomerByCpf from "../usecases/getCustomerByCpf.usecase";
import CreateCustomer from "../usecases/createCustomer.usecase";
import { CustomerInterface } from "../entities/customer.entity";
export class CustomerController {
  constructor() {}

  static getCustomerByCpf(cpf: string, customerRepository: CustomerGatewayInterface) {
    const customerGateway = new CustomerGateway(customerRepository);
    try {
      const customerByCpf = GetCustomerByCpf.getCustomerByCpf(cpf, customerGateway);
      return customerByCpf;
    } catch (error) {
      throw new Error('Failed to fetch customer by CPF');
    }
  }

  static createCustomer(createCustomerDTO: CustomerInterface, customerRepository: CustomerGatewayInterface) {
    const customerGateway = new CustomerGateway(customerRepository);
    try {
      return CreateCustomer.create(createCustomerDTO, customerGateway);
    } catch (error) {
      console.error('Error creating customer:', error);
      throw new Error('Failed to create customer');
    }
  }
}