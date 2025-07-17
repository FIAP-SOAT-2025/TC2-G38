import { Injectable } from '@nestjs/common';
import CustomerGatewayInterface from '../../interfaces/gateways';
import { PrismaService } from 'src/shared/infra/prisma.service';
import { CustomerInterface, Customer } from '../../entities/customer.entity';

@Injectable()
export class PrismaCustomerRepository implements CustomerGatewayInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(customer: CustomerInterface): Promise<any> {
    try {
      const createdRecord = await this.prisma.customer.create({
        data: {
          name: customer.name,
          cpf: customer.cpf,
          email: customer.email,
        },
      });
      return createdRecord;
    } catch (error) {
      console.error('Error creating item:', error);
      throw new Error('Failed to create customer');
    }
  }

  async findById(id: string): Promise<any> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });
    if (!customer) return null;

    return customer;
  }

  async findByCpf(cpf: string): Promise<any> {
    try {
      const customer = await this.prisma.customer.findUnique({
        where: { cpf },
      });
      if (!customer) return null;
      return customer;
    } catch (error) {
      console.error('Error fetching customer by CPF:', error);
      throw new Error(`Failed to fetch customer by CPF: ${error}`);
    }
  }

  async findByCpfOrEmail(cpf: string, email: string): Promise<boolean> {
    try {
      const customer = await this.prisma.customer.findFirst({
        where: {
          OR: [{ email: email }, { cpf: cpf }],
        },
      });
      if (!customer) return false
      return true;
    } catch (error) {
      console.error('Error fetching customer by CPF:', error);
      throw new Error(`Failed to fetch customer by CPF: ${error}`);
    }
  }

  async update(
    id: string,
    customer: Partial<CustomerInterface>,
    customerEntity: Customer,
  ): Promise<any> {
    try {
      const updatedCustomer = await this.prisma.customer.update({
        where: { id },
        data: {
          name: customer.name || customerEntity.name,
          cpf: customerEntity.cpf,
          email: customer.email || customerEntity.email,
          createdAt: customerEntity.createdAt,
          updatedAt: new Date(),
        },
      });
      return updatedCustomer;
    } catch (error) {
      throw new Error(`Error updating customer: ${error}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.customer.delete({ where: { id } });
    } catch (e) {
      console.log(e);
      throw new Error('Failed to delete customer');
    }
  }

  async getEmailById(customerId: string): Promise<string> {
    try {
      const customer = await this.prisma.customer.findUnique({
        where: { id: customerId },
        select: { email: true }
      });

      if (!customer) throw new Error('Customer not found');

      return customer.email;
    } catch (error) {
      console.error('Error fetching customer email:', error);
      throw new Error('Failed to fetch customer email');
    }
  }
}
