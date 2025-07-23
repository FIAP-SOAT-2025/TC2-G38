import {
  Body,
  Controller,
  Param,
  Patch,
  Get,
  Post,
  Delete,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCustomerDTO } from '../dto/update-customer.dto';
import { CreateCustomerDTO } from '../dto/create-customer.dto';
import { CustomerController } from '../../../../controllers/customer.controller';
import { PrismaCustomerRepository } from '../../persistence/prismaCustomer.repository';
import { ExceptionMapper } from '../../../../../shared/exceptions/exception.mapper';
import { BaseException } from '../../../../../shared/exceptions/exceptions.base';

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
      throw ExceptionMapper.mapToHttpException(error as BaseException);
    }
    
  }

  @Patch('/:id')
  async updateCustomer(
    @Body() updateCustomerDTO: UpdateCustomerDTO,
    @Param('id') id: string,
  ): Promise<any> {
    try {
      return await CustomerController.updateCustomer(
        id,
        updateCustomerDTO,
        this.customerRepository,
      );
    } catch (error) {
      throw ExceptionMapper.mapToHttpException(error as BaseException);
    }
  }
  @Delete('/:id')
  async deleteCustomer(
    @Param('id') id: string,
    @Res() response: any,
  ): Promise<void> {
    try {
      await CustomerController.deleteCustomer(id, this.customerRepository);
      response.status(204).send();
    } catch (error) {
      throw ExceptionMapper.mapToHttpException(error as BaseException);
    }
  }

  @Get('/:cpf')
  async getCustomerByCpf(@Param('cpf') cpf: string): Promise<any> {
    try {
      return await CustomerController.getCustomerByCpf(cpf, this.customerRepository);
    } catch (error) {
      throw ExceptionMapper.mapToHttpException(error as BaseException);
    }
  }

}
