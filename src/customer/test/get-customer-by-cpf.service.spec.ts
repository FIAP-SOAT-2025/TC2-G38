import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { Customer } from '../domain/model/customer.entity';
import GetCustomerByCpfService from '../application/services/getCustomerByCpf.service';

describe('UpdateCustomerService', () => {
  let service: GetCustomerByCpfService;
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
        GetCustomerByCpfService,
        {
          provide: 'CustomerRepository',
          useValue: {
            findByCpf: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GetCustomerByCpfService>(GetCustomerByCpfService);
    repository = module.get('CustomerRepository');
  });

  it('should get a customer by CPF successfully', async () => {
    const cpf = '578.303.700-10';

    repository.findByCpf.mockResolvedValue(customerEntity);
    const result = await service.getCustomerByCpf(cpf);
    expect(result).toEqual(customerEntity);
  });

  it('should throw NotFoundException when customer does not exist', async () => {
    const cpf = '123.456.789-00';
    repository.findByCpf.mockImplementationOnce(() => {
      throw new NotFoundException('Failed to fetch customer by CPF:');
    });
    await expect(service.getCustomerByCpf(cpf)).rejects.toThrow(NotFoundException);
    await expect(service.getCustomerByCpf(cpf)).rejects.toThrow('Failed to fetch customer by CPF');
  });
});
