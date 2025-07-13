import { Injectable, NotFoundException } from '@nestjs/common';
import CustomerGatewayInterface from '../../interfaces/gateways';
import { Customer } from '../../entities/customer.entity';
import { PrismaService } from 'src/shared/infra/prisma.service';


@Injectable()
export class PrismaCustomerRepository implements CustomerGatewayInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(newCustomer: Customer): Promise<Customer> {
    try {
      const createdRecord = await this.prisma.customer.create({
        data: {
          name: newCustomer.name,
          cpf: newCustomer.cpf,
          email: newCustomer.email,
        },
      });
      return new Customer(createdRecord);
    } catch (error) {
      console.error('Error creating item:', error);
      throw new Error('Failed to create customer');
    }
  }

  async findById(id: string): Promise<any> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });
    if (!customer) throw new NotFoundException('Customer not found');

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

  async findByCpfOrEmail(cpf: string, email: string): Promise<any> {
    try {
      const customer = await this.prisma.customer.findFirst({
        where: {
          OR: [{ email: email }, { cpf: cpf }],
        },
      });
      if (!customer) throw new NotFoundException('Customer not found');
      return customer;
    } catch (error) {
      console.error('Error fetching customer by CPF:', error);
      throw new Error(`Failed to fetch customer by CPF: ${error}`);
    }
  }

  async update(
    id: string,
    customer: Partial<Customer>,
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

  async findAll(): Promise<Customer[]> {
    // corrected return type
    // Implement the logic to find all customers using Prisma
    return [];
  }
}
