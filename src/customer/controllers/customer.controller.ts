
import { CustomerGateway } from "../gateways/customer.gateway"
import CustomerGatewayInterface from "../interfaces/gateways";
import GetCustomerByCpf from "../usecases/getCustomerByCpf.usecase";
import CreateCustomer from "../usecases/createCustomer.usecase";
import UpdateCustomer from "../usecases/updateCustomer.usecase";
import DeleteCustomerUseCase from "../usecases/deleteCustomer.usecase";
import { Customer, CustomerInterface } from "../entities/customer.entity";
import { BaseException } from 'src/shared/exceptions/exceptions.base';
export class CustomerController {
  constructor() {}

  static async getCustomerByCpf(cpf: string, customerRepository: CustomerGatewayInterface) {
    const customerGateway = new CustomerGateway(customerRepository);
    try {
      const customerByCpf = await GetCustomerByCpf.getCustomerByCpf(cpf, customerGateway);
      return customerByCpf;
    } catch (error: any) {
      throw new BaseException(
        error.message || `Error fetching customer by CPF`,
        error.statusCode || 500,
        error.errorCode || 'CUSTOMER_FETCH_ERROR',
      );
    }
  }

  static createCustomer(createCustomerDTO: CustomerInterface, customerRepository: CustomerGatewayInterface) {
    const customerGateway = new CustomerGateway(customerRepository);
    try {
      return CreateCustomer.create(createCustomerDTO, customerGateway);
    } catch (error) {
      throw new Error('Failed to create customer');
    }
  }

  static async updateCustomer(
    id: string,
    updateCustomerDTO: Partial<CustomerInterface>,
    customerRepository: CustomerGatewayInterface
  ): Promise<any> {
    const customerGateway = new CustomerGateway(customerRepository);
    try {
      return UpdateCustomer.updated(id, updateCustomerDTO, customerGateway);
    } catch (error) {
      throw new Error(`Error updating customer: ${error}`);
    }
  }

  static async deleteCustomer(id: string, customerRepository: CustomerGatewayInterface): Promise<void> {
    const customerGateway = new CustomerGateway(customerRepository);
    try {
      return DeleteCustomerUseCase.delete(id, customerGateway);
    } catch (error) {
      throw new Error(`Error deleting customer: ${error}`);
    }
  }
}