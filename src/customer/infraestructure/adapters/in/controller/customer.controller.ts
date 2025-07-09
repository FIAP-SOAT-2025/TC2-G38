import {
  Body,
  Controller,
  Param,
  Patch,
  Inject,
  Get,
  Post,
  Delete,
} from '@nestjs/common';
import { UpdateCustomerDTO } from 'src/customer/domain/dto/update-customer.dto';
import { Customer } from 'src/customer/domain/model/customer.entity';
import { UpdateCustomerServiceInterface } from 'src/customer/domain/services/updateCustomer.service.interface';
import { GetCustomerByCpfServiceInterface } from 'src/customer/domain/services/getCustomerByCpf.service.interface';
import { ApiTags } from '@nestjs/swagger';
import { CreateCustomerDTO } from 'src/customer/domain/dto/create-customer.dto';
import CreateCustomerService from 'src/customer/application/services/create-customer.service';
import DeleteCustomerService from 'src/customer/application/services/delete-customer.service';

@ApiTags('Customer')
@Controller('/customer')
export class CustomerController {
  constructor(
    @Inject('UpdateCustomerService')
    private readonly updateCustomerService: UpdateCustomerServiceInterface,
    @Inject('CreateCustomerService')
    private readonly createCustomerService: CreateCustomerService,
    @Inject('DeleteCustomerService')
    private readonly deleteCustomerService: DeleteCustomerService,
    @Inject('GetCustomerByCpfService')
    private readonly getCustomerByCpfService: GetCustomerByCpfServiceInterface,
  ) {}

  @Post()
  async createCustomer(@Body() createCustomerDTO: CreateCustomerDTO) {
    return this.createCustomerService.create(createCustomerDTO);
  }

  @Patch('/:id')
  async updateCustomer(
    @Body() updateCustomerDTO: UpdateCustomerDTO,
    @Param('id') id: string,
  ): Promise<Customer> {
    return await this.updateCustomerService.updated(id, updateCustomerDTO);
  }

  @Delete('/:id')
  async deleteCustomer(@Param('id') id: string): Promise<void> {
    await this.deleteCustomerService.delete(id);
  }

  @Get('/:cpf')
  async getCustomerByCpf(@Param('cpf') cpf: string): Promise<Customer> {
    return await this.getCustomerByCpfService.getCustomerByCpf(cpf);
  }
}
