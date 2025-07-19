import { Customer, CustomerInterface } from "../entities/customer.entity";
import CustomerGatewayInterface from "../interfaces/gateways";


export class CustomerGateway implements CustomerGatewayInterface {
  constructor(
    private readonly customerRepository: CustomerGatewayInterface
  ) {}

  async create(customer: Customer): Promise<Customer> {
    const newCustomer = await this.customerRepository.create(customer);
    return new Customer(newCustomer);
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      return null;
    }
    return new Customer(customer);
  }

  async findByCpf(cpf: string): Promise<Customer | null> {
    const customer = await this.customerRepository.findByCpf(cpf);
    if (!customer) {
      return null;
    }
    return new Customer(customer);
  }

  async findByCpfOrEmail(cpf: string, email: string): Promise<boolean> {
    const customer = await this.customerRepository.findByCpfOrEmail(cpf, email);
    return !!customer;
  }

  async update(
    id: string,
    customer: Partial<Customer>,
    customerEntity: Customer,
  ): Promise<Customer> {
    return new Customer(await this.customerRepository.update(id, customer, customerEntity));
  }

  async delete(id: string): Promise<void> {
    try {
      return await this.customerRepository.delete(id);
    } catch (e) {
      console.log(e);
      throw new Error('Failed to delete customer');
    }
  }

  async getEmailById(customerId: string): Promise<string> {
    try {
      return await this.customerRepository.getEmailById(customerId);
    } catch (error) {
      console.error('Error fetching customer email:', error);
      throw new Error('Failed to fetch customer email');
    }
  }
}
