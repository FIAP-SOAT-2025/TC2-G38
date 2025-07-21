import { Injectable } from '@nestjs/common';
import CustomerGatewayInterface from '../../../interfaces/gateways';
import { PrismaService } from 'src/shared/infra/prisma.service';
import { CustomerInterface, Customer } from '../../../entities/customer.entity';

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
      throw error
    }
  }

  async findById(id: string): Promise<any> {
    try {
      const customer = await this.prisma.customer.findUnique({
        where: { id },
      });
      if (!customer) return null;
      return customer;
    } catch (error) {
      throw error
    }
  }

  async findByCpf(cpf: string): Promise<any> {
    try {
      const customer = await this.prisma.customer.findUnique({
        where: { cpf },
      });
      if (!customer) return null;
      return customer;
    } catch (error) {
      throw error
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
      throw error;
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
      throw error;
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
      throw error;
    }
  }
}
