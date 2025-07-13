import { Customer } from '../entities/customer.entity'
import { CustomerInterface } from '../entities/customer.entity';

export default interface CustomerGatewayInterfa {
  create(customer: Customer): Promise<Customer>;
  findById(id: string): Promise<Customer>;
  findByCpf(cpf: string): Promise<Customer | null>;
  findByCpfOrEmail(cpf: string, email: string): Promise<Customer>;
  update(
    id: string,
    customer: Partial<CustomerInterface>, //UpdateCustomerDTO
    customerExists: Customer,
  ): Promise<Customer>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Customer[]>;
  getEmailById(id: string): Promise<string>;
}
