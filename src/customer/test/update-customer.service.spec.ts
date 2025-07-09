import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { Customer } from '../domain/model/customer.entity';
import UpdateCustomerService from '../application/services/updateCustomer.service';
import { UpdateCustomerDTO } from '../domain/dto/update-customer.dto';
import CustomerRepository from '../domain/repository/customer.repository';

describe('UpdateCustomerService', () => {
  let service: UpdateCustomerService;
  let repository: any;

  const customerEntity = new Customer({
    id: '123',
    name: 'Felipe Alves',
    cpf: '578.303.700-10',
    email: 'felipe@alves.com',
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateCustomerService,
        {
          provide: 'CustomerRepository',
          useValue: {
            update: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UpdateCustomerService>(UpdateCustomerService);
    repository = module.get('CustomerRepository');
  });

  it('should updated an customer successfully', async () => {
    
    const customerDTO: UpdateCustomerDTO = {
      name: 'Felipe Alves',
      email: 'felipe@alves.com',
    };

    repository.findById.mockResolvedValue(customerEntity);
    repository.update.mockResolvedValue(customerEntity);
    const result = await service.updated('123', customerDTO);
    expect(result).toEqual(customerEntity);
  });

  it('should throw NotFoundException when customer does not exist', async () => {
    const customerDTO: UpdateCustomerDTO = {
      name: 'Felipe Alves',
      email: 'felipe@alves.com',
    };

    repository.findById.mockImplementationOnce(() => {
      throw new NotFoundException('Customer not found');
    });

    await expect(service.updated('1234', customerDTO)).rejects.toThrow(NotFoundException);
    await expect(service.updated('1234', customerDTO)).rejects.toThrow('Customer not found');
  });
})
