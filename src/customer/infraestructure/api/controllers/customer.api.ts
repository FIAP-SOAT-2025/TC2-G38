import {
  Body,
  Controller,
  Param,
  Patch,
  Get,
  Post,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCustomerDTO } from '../dto/update-customer.dto';
import { CreateCustomerDTO } from '../dto/create-customer.dto';
import { CustomerController } from '../../../controllers/customer.controller';
import { PrismaCustomerRepository } from '../../persistence/prismaCustomer.repository';


@ApiTags('Customer')
@Controller('/customer')
export class CustomerApi {
  constructor(
    private readonly customerRepository: PrismaCustomerRepository
  ) {}

  @Post()
  async createCustomer(@Body() createCustomerDTO: CreateCustomerDTO) {
    try {
      return await CustomerController.createCustomer(
      createCustomerDTO,
      this.customerRepository,
    );
    } catch (error) {
      throw new Error(`Failed to create customer:`);
    }
    
  }

  @Patch('/:id')
  async updateCustomer(
    @Body() updateCustomerDTO: UpdateCustomerDTO,
    @Param('id') id: string,
  ): Promise<any> {
    return CustomerController.updateCustomer(
      id,
      updateCustomerDTO,
      this.customerRepository,
    );
  }

  @Delete('/:id')
  async deleteCustomer(@Param('id') id: string): Promise<void> {
    return CustomerController.deleteCustomer(id, this.customerRepository);
  }

  @Get('/:cpf')
  async getCustomerByCpf(@Param('cpf') cpf: string): Promise<any> {
    try {
      return await CustomerController.getCustomerByCpf(cpf, this.customerRepository);
    } catch (error) {
      throw new Error(`Failed to fetch customer by CPF: ${error}`);
    }
  }

}
