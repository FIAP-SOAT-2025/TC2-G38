import { Cpf, CustomerInterface } from '../entities/customer.entity';
import CustomerGatewayInterface from '../interfaces/gateways';
import { CustomerPresenter } from "../presenters/customer.presenter";

export default class GetCustomerByCpf {
  constructor() {}
  static async getCustomerByCpf(cpf: string, customerGateway: CustomerGatewayInterface): Promise<CustomerInterface> {
    try {
      const customer = await customerGateway.findByCpf(
        new Cpf(cpf).getCpf(),
      );
      if (!customer) {
        throw new Error('Customer not found');
      }
      return CustomerPresenter.formatCustomerToJson(customer);
    } catch (error) {
      throw new Error(`Failed to fetch customer by CPF ${cpf}: ${error}`);
    }
  }
}
