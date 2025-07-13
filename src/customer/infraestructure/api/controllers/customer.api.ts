import {
  Body,
  Controller,
  Param,
  Patch,
  Get,
  Post,
  Delete,
} from '@nestjs/common';
import { UpdateCustomerDTO } from '../dto/update-customer.dto';
import { CreateCustomerDTO } from '../dto/create-customer.dto';
import { ApiTags } from '@nestjs/swagger';
import { CustomerController } from 'src/customer/controllers/customer.controller';
import { PrismaCustomerRepository } from '../../persistence/prismaCustomer.repository';


@ApiTags('Customer')
@Controller('/customer')
export class CustomerApi {
  constructor(
    private readonly customerRepository: PrismaCustomerRepository
  ) {}

  @Post()
  async createCustomer(@Body() createCustomerDTO: CreateCustomerDTO) {
    return CustomerController.createCustomer(
      createCustomerDTO,
      this.customerRepository,
    );
  }

  @Patch('/:id')
  async updateCustomer(
    @Body() updateCustomerDTO: UpdateCustomerDTO,
    @Param('id') id: string,
  ): Promise<any> {
    
  }

  @Delete('/:id')
  async deleteCustomer(@Param('id') id: string): Promise<void> {
  }

  @Get('/:cpf')
  async getCustomerByCpf(@Param('cpf') cpf: string): Promise<any> {
    return CustomerController.getCustomerByCpf(cpf, this.customerRepository);
  }

}
