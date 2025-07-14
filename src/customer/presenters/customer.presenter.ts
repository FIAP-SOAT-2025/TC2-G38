import { Customer, CustomerInterface } from "../entities/customer.entity";
export class CustomerPresenter {
  constructor() {}

  static formatCustomerToJson(customer: Customer): CustomerInterface {
    return {
      id: customer.id,
      name: customer.name,
      cpf: customer.cpf,
      email: customer.email,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    };
  }
}