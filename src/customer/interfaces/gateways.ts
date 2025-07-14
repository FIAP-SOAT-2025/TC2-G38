import { Customer, CustomerInterface } from '../entities/customer.entity'

export default interface CustomerGatewayInterfa {
  create(customer: Customer): Promise<Customer>;
  findById(id: string): Promise<CustomerInterface>;
  findByCpf(cpf: string): Promise<Customer | null>;
  findByCpfOrEmail(cpf: string, email: string): Promise<boolean>;
  update(
    id: string,
    customer: Partial<CustomerInterface>, //UpdateCustomerDTO
    customerExists: Customer,
  ): Promise<CustomerInterface>;
  delete(id: string): Promise<void>;
  findAll(): Promise<CustomerInterface[]>;
  getEmailById(id: string): Promise<string>;
}
