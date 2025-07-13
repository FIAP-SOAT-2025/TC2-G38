import { Customer, Cpf } from '../entities/customer.entity';
import CustomerGatewayInterface from '../interfaces/gateways';

export default class GetCustomerByCpf {
  constructor() {}
  static async getCustomerByCpf(cpf: string, customerGateway: CustomerGatewayInterface): Promise<Customer> {
    try {
      const customer = await customerGateway.findByCpf(
        new Cpf(cpf).getCpf(),
      );
      if (!customer) {
        throw new Error('Customer not found');
      }
      return customer;
    } catch (error) {
      throw new Error(`Failed to fetch customer by CPF ${cpf}: ${error}`);
    }
  }
}
