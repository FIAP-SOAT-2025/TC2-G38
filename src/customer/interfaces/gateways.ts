import { Customer, CustomerInterface } from '../entities/customer.entity'

export default interface CustomerGatewayInterface {
  create(customer: Customer): Promise<Customer>;
  findById(id: string): Promise<Customer | null>;
  findByCpf(cpf: string): Promise<Customer | null>;
  findByCpfOrEmail(cpf: string, email: string): Promise<boolean>;
  update(
    id: string,
    customer: Partial<CustomerInterface>,
    customerExists: Customer,
  ): Promise<CustomerInterface>;
  delete(id: string): Promise<void>;
  getEmailById(id: string): Promise<string>;
}
