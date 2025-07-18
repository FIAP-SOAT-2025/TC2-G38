
import { CustomerGateway } from "../gateways/customer.gateway"
import CustomerGatewayInterface from "../interfaces/gateways";
import GetCustomerByCpf from "../usecases/getCustomerByCpf.usecase";
import CreateCustomer from "../usecases/createCustomer.usecase";
import UpdateCustomer from "../usecases/updateCustomer.usecase";
import DeleteCustomerUseCase from "../usecases/deleteCustomer.usecase";
import { CustomerInterface } from "../entities/customer.entity";
import { CustomerPresenter } from "../presenters/customer.presenter";
export class CustomerController {
  constructor() {}

  static async getCustomerByCpf(cpf: string, customerRepository: CustomerGatewayInterface) {
    const customerGateway = new CustomerGateway(customerRepository);
    return CustomerPresenter.formatCustomerToJson(await GetCustomerByCpf.getCustomerByCpf(cpf, customerGateway));
  }

  static async createCustomer(createCustomerDTO: CustomerInterface, customerRepository: CustomerGatewayInterface) {
    const customerGateway = new CustomerGateway(customerRepository);
    return CustomerPresenter.formatCustomerToJson(await CreateCustomer.create(createCustomerDTO, customerGateway));
  }

  static async updateCustomer(
    id: string,
    updateCustomerDTO: Partial<CustomerInterface>,
    customerRepository: CustomerGatewayInterface
  ): Promise<any> {
    const customerGateway = new CustomerGateway(customerRepository);

    return CustomerPresenter.formatCustomerToJson(await UpdateCustomer.updated(id, updateCustomerDTO, customerGateway)); 
  }

  static async deleteCustomer(id: string, customerRepository: CustomerGatewayInterface): Promise<void> {
    const customerGateway = new CustomerGateway(customerRepository);
    return DeleteCustomerUseCase.delete(id, customerGateway);
  }
}