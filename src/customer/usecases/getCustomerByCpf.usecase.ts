import { Cpf, CustomerInterface } from '../entities/customer.entity';
import CustomerGatewayInterface from '../interfaces/gateways';
import { CustomerPresenter } from "../presenters/customer.presenter";
import { BaseException } from 'src/shared/exceptions/exceptions.base';

export default class GetCustomerByCpf {
  constructor() {}
  static async getCustomerByCpf(cpf: string, customerGateway: CustomerGatewayInterface): Promise<CustomerInterface> {
    const customer = await customerGateway.findByCpf(
      new Cpf(cpf).getCpf(),
    );
    if (!customer) {
      throw new BaseException(
        `Customer with CPF ${cpf} not found`,
        404,
        'CUSTOMER_NOT_FOUND',
      );
    }
    return CustomerPresenter.formatCustomerToJson(customer);
  }
}
