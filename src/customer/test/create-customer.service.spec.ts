import { Test, TestingModule } from '@nestjs/testing';

import CreateCustomerService from '../application/services/create-customer.service';
import CustomerRepository from '../domain/repository/customer.repository';
import { Customer } from '../domain/model/customer.entity';
import { CreateCustomerDTO } from '../domain/dto/create-customer.dto';
import { BadRequestException } from '@nestjs/common/exceptions';
import onlyNumbers from 'src/shared/utils/string';

describe('CreateCustomService', () => {
  let service: CreateCustomerService;
  let repository: jest.Mocked<CustomerRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCustomerService,
        {
          provide: 'CustomerRepository',
          useValue: {
            create: jest.fn(),
            findByCpfOrEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateCustomerService>(CreateCustomerService);
    repository = module.get('CustomerRepository');
  });

  it('should registred an customer successfully', async () => {
    const customerDTO: CreateCustomerDTO = {
      name: 'Luiz Resplande',
      cpf: '578.303.700-10',
      email: 'hoje@ontem.com',
    };

    const customerEntity = new Customer({ ...customerDTO, id: '123' });
    repository.findByCpfOrEmail.mockRejectedValue(undefined);
    repository.create.mockResolvedValue(customerEntity);
    const result = await service.create(customerDTO);
    expect(result).toEqual(customerEntity);
    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        cpf: onlyNumbers(customerDTO.cpf),
        email: customerDTO.email,
        name: customerDTO.name,
      }),
    );
  });

  it('should throw BadRequestException if the CPF is invalid', async () => {
    const customerDTO: CreateCustomerDTO = {
      name: 'Luiz Resplande',
      cpf: '578.303.200-10',
      email: 'hoje@ontem.com',
    };

    repository.create.mockImplementationOnce(() => {
      throw new BadRequestException('CPF Invalid');
    });

    repository.findByCpfOrEmail.mockRejectedValue(undefined);

    await expect(service.create(customerDTO)).rejects.toThrow(
      BadRequestException,
    );
  });
});
