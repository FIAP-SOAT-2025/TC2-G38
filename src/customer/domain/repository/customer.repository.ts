import { Customer } from '../model/customer.entity';
import { UpdateCustomerDTO } from '../dto/update-customer.dto';

export default interface CustomerRepository {
  create(customer: Customer): Promise<Customer>;
  findById(id: string): Promise<Customer>;
  findByCpf(cpf: string): Promise<Customer>;
  findByCpfOrEmail(cpf: string, email: string): Promise<Customer>;
  update(
    id: string,
    customer: Partial<UpdateCustomerDTO>,
    customerExists: Customer,
  ): Promise<Customer>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Customer[]>;
  getEmailById(id: string): Promise<string>;
}
