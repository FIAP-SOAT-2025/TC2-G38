import { Customer, CustomerInterface } from "../entities/customer.entity";
import CustomerGatewayInterface from "../interfaces/gateways";


export class CustomerGateway implements CustomerGatewayInterface {
  constructor(
    private readonly customerRepository: CustomerGatewayInterface
  ) {}

  async create(customer: Customer): Promise<Customer> {
    try {
      const newCustomer = await this.customerRepository.create(customer);
      return new Customer(newCustomer);
    } catch (error) {
      throw new Error('Failed to create customer');
    }
  }

  async findById(id: string): Promise<any> {
    return
  }

  async findByCpf(cpf: string): Promise<Customer | null> {
    try {
      const customer = await this.customerRepository.findByCpf(cpf);
      if (!customer) {
        return null;
      }
      return new Customer(customer);
    } catch (error) {
      console.error('Error fetching customer by CPF:', error);
      throw new Error(`Failed to fetch customer by CPF: ${error}`);
    }
  }

  async findByCpfOrEmail(cpf: string, email: string): Promise<boolean> {
    try {
      const customer = await this.customerRepository.findByCpfOrEmail(cpf, email);
      return !!customer;
    } catch (error) {
      throw new Error(`Failed to fetch customer by CPF: ${error}`);
    }
  }

  async update(
    id: string,
    customer: Partial<Customer>,
    customerEntity: Customer,
  ): Promise<any> {
    try {
      return
    } catch (error) {
      throw new Error(`Error updating customer: ${error}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      return
    } catch (e) {
      console.log(e);
      throw new Error('Failed to delete customer');
    }
  }

  async getEmailById(customerId: string): Promise<string> {
    try {
      return ''
    } catch (error) {
      console.error('Error fetching customer email:', error);
      throw new Error('Failed to fetch customer email');
    }
  }

  async findAll(): Promise<Customer[]> {
    return [];
  }
}
